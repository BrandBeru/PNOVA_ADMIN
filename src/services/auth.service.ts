import boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserService from "./user.service";
import config from "../config/config";
import nodemailer from "nodemailer";

const service = new UserService();
class AuthService {
  async createAccount(userCb: any) {
    const user = await service.findByEmail(userCb.email);
    if (user) {
      const token = await this.signToken(user)
      return token;
    }
    const rta = await service.create(userCb);
    const token = await this.signToken(rta);
    return token;
  }
  async getUser(email: string, password: string) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.notFound();
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw boom.unauthorized();
    }
    return user;
  }
  async signToken(user: any) {
    const payload = {
      sub: user._id,
      scope: user.role,
    };
    await service.updateOne(payload.sub, {lastLoginDate: new Date()});
    const secret: string = config.jwtSecret;
    const token = jwt.sign(payload, secret);
    return token;
  }
  async sendChangePassword(id: string) {
    const user = await service.getById(id);
    if (!user) {
      throw boom.notFound();
    }
    const payload = { sub: user._id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "15min" });
    await service.updateOne(user._id, { recoveryToken: token });
    const link = `${config.frontend_url}/recovery?token=${token}`;
    const mail = {
      from: config.email_user,
      to: `${user.email}`,
      subject: `PNOVA\\VIGE STUDIIOS - Password recovery`,
      html: this.emailStructure(
        `Hola ${user.name} ${user.lastName},`,
        "Aqui esta el link para reestablecer tu contraseña, lamentamos cualquier inconveniente presentado.",
        { text: "Reset your password", url: link },
        `Equipo PNOVA\VIGE, conoce mas en: <a class="link" href="https://pnovastudios.xyz/about">https://pnovastudios.xyz/about</a>`,
        user.email,
        `Este link solo sera valido por los proximos 15 minutos.
        Una vez pase el tiempo estimado tendras que volver a solicitar uno nuevo en nuestro sitio web.
        Si tienes alguna pregunta o feedback, no respondas a este email envianos un correo a:
        <a class="link" href="mailto:support@pnovastudios.xyz">support@pnovastudios.xyz</a>`,
        "Ten un excelente dia!",
      ),
    };
    return await this.sendEmail(mail);
  }
  async sendRecoveryPassword(email: string) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.notFound();
    }
    const payload = { sub: user._id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "15min" });
    await service.updateOne(user._id, { recoveryToken: token });
    const link = `${config.frontend_url}/public/html/recovery.html?token=${token}`;
    const mail = {
      from: '"PNOVA STUDIIOS" '+config.email_user,
      to: `${user.email}`,
      subject: `PNOVA\\VIGE STUDIIOS - Reset your password`,
      html: this.emailStructure(
        `Hola ${user.name} ${user.lastName},`,
        "Aqui esta el link para reestablecer tu contraseña, lamentamos cualquier inconveniente presentado.",
        { text: "Reset your password", url: link },
        `Equipo PNOVA\\VIGE, conoce mas en: <a class="link" href="https://pnovastudios.xyz">https://pnovastudios.xyz</a>`,
        user.email,
        `Este link solo sera valido por los proximos 15 minutos.
        Una vez pase el tiempo estimado tendras que volver a solicitar uno nuevo en nuestro sitio web.
        Si tienes alguna pregunta o feedback, no respondas a este email envianos un correo a:
        <a class="link" href="mailto:pnovavigestudiios@gmail.com">pnovavigestudiios@gmail.com</a>`,
        "Ten un excelente dia!",
      ),
    };
    return await this.sendEmail(mail);
  }
  async sendEmailActivation(email: string){
    const user = await service.findByEmailForVerification(email);
    if (!user) {
      throw boom.notFound('Email is already verified or does not exists.');
    }
    const payload = { sub: user._id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "15min" });
    await service.updateOne(user._id, { recoveryToken: token });
    const link = `${config.frontend_url}/public/html/recovery.html?token=${token}`;
    const mail = {
      from: '"PNOVA STUDIIOS" '+config.email_user,
      to: `${user.email}`,
      subject: `PNOVA\\VIGE STUDIIOS - Account activation`,
      html: this.emailStructure(
        `Hola ${user.name} ${user.lastName},`,
        "Aqui esta el link para activar tu correo.",
        { text: "Activate your account", url: link },
        `Equipo PNOVA\VIGE, conoce mas en: <a class="link" href="https://pnovastudios.xyz">https://pnovastudios.xyz</a>`,
        user.email,
        `Este link solo sera valido por los proximos 15 minutos.
        Una vez pase el tiempo estimado tendras que volver a solicitar uno nuevo en nuestro sitio web.
        Si tienes alguna pregunta o feedback, no respondas a este email envianos un correo a:
        <a class="link" href="mailto:pnovavigestudiios@gmail.com">pnovavigestudiios@gmail.com</a>`,
        "Ten un excelente dia!",
      ),
    };
    return await this.sendEmail(mail);
  }
  async activeAccount(token:string){
    const payload = jwt.verify(token, config.jwtSecret);
    const sub: any = payload.sub;
    const user = await service.findOne(sub);
    if (user.recoveryToken !== token) {
      throw boom.unauthorized();
    }
    await service.updateOne(user._id, { recoveryToken: "", "meta.isActive": true});
    const rta = await this.signToken(user)
    return rta;
  }
  async emailSender(subject: String, html: Object, to: string) {
    const clients = await service.getClients();
    const emails = clients.map((client) => client.email);
    const mail = {
      from: config.email_user,
      to: [...emails],
      subject: subject,
      html: html,
    };
    return await this.sendEmail(mail);
  }
  emailStructure(
    greeting: string,
    info: string,
    button: { text: string; url: string },
    farewell: string,
    clientEmail: string,
    ...paragraph: string[]
  ) {
    const email = `
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Jaldi&display=swap');
        body{
            background-color: rgb(206, 206, 206);
            font-family: 'Jaldi', sans-serif;
            margin: 0;
            width: 100vw;
            height: 100vh;
        }
        .patern{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        .container{
            background-color: aliceblue;
            border-radius: 12px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        .header{
            background-image: url(https://www.wexinc.com/wp-content/uploads/2021/02/DivisionPage_Evolving@2x.png);
            background-position: center;
            background-size: cover;
            padding: 20px;
            padding-left: 30px;
            border-radius: 12px 12px 0 0;
        }
        .titles{
            background-color: rgba(0, 0, 0, 0.6);
            width: fit-content;
            color: #B46136;
            padding: 5px 15px 5px 15px;
            line-height: 1em;
            border-radius: 12px;
        }
        .title2{
            color: aliceblue;
            text-align: right;
        }
        .body-container{
            padding: 10px;
            padding-left: 50px;
            padding-right: 50px;
        }
        .reset-container{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
        }
        .reset{
            justify-self: center;
            background-color: #FFFFFF;
            text-decoration: none;
            color: #A42A28;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        .link{
            text-decoration: none;
            transition-duration: .5s;
            color: #A42A28;
        }
        .link:hover{
            color: #fc7634;
        }
        .more{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: end;
        }
        h3{
            align-items: center;
        }
        .info{
            text-align: center;
        }
    </style>
</head>
<body>
        <div class="container">
            <div class="header">
                <div class="titles">
                    <h1 class="title1">PNOVA \ VIGE</h1>
                    <h1 class="title2">STUDIIOS</h1>
                </div>
            </div>
            <div class="body-container">
                <p>${greeting}</p>
                <p>${info}</p>
                <div class="reset-container">
                    <a class="reset" href="${button.url}">${button.text}</a>
                </div>
                ${paragraph.map((p) => `<p>${p}</p>`).join("")}
                <div class="more">
                    <h3>${farewell}</h3>
                </div>
            </div>
        </div>
        <p class="info">Este email fue enviado para la acuenta registrada como ${clientEmail}.
            Tu recibiste este mensaje porque alguien puso esta direccion de email en nuestro sitio web.</p>
</body>
</html>
`;
    return email;
  }
  async changePassword(token: string, newPassword: string) {
    const payload = jwt.verify(token, config.jwtSecret);
    const sub: any = payload.sub;
    const user = await service.findOne(sub);
    if (user.recoveryToken !== token) {
      throw boom.unauthorized();
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await service.updateOne(user._id, { recoveryToken: "", password: hash });
    return { message: "Password changed successfully!" };
  }
  async sendEmail(email: any) {
    const options = {
      host: config.email_host,
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: config.email_user,
        pass: config.email_password,
      },
    };
    const transporter = nodemailer.createTransport(options);
    await transporter.sendMail(email);
    return { message: "Email sent successfully!" };
  }
}

export default AuthService;
