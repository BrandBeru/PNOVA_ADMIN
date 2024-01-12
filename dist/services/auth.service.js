"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("./user.service"));
const config_1 = __importDefault(require("../config/config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const service = new user_service_1.default();
class AuthService {
    createAccount(userCb) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield service.findByEmail(userCb.email);
            if (user) {
                const token = yield this.signToken(user);
                return token;
            }
            const rta = yield service.create(userCb);
            const token = yield this.signToken(rta);
            return token;
        });
    }
    getUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield service.findByEmail(email);
            if (!user) {
                throw boom_1.default.notFound();
            }
            const compare = yield bcryptjs_1.default.compare(password, user.password);
            if (!compare) {
                throw boom_1.default.unauthorized();
            }
            return user;
        });
    }
    signToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                sub: user._id,
                scope: user.role,
            };
            const secret = config_1.default.jwtSecret || "";
            const token = jsonwebtoken_1.default.sign(payload, secret);
            return token;
        });
    }
    sendRecoveryPassword(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield service.getById(id);
            if (!user) {
                throw boom_1.default.notFound();
            }
            const payload = { sub: user._id };
            const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: "15min" });
            yield service.updateOne(user._id, { recoveryToken: token });
            const link = `${config_1.default.frontend_url}/recovery?token=${token}`;
            const mail = {
                from: config_1.default.email_user,
                to: `${user.email}`,
                subject: `PNOVA\\VIGE STUDIIOS - Password recovery`,
                html: this.emailStructure(`Hola Giovanny Bernal,`, "Aqui esta el link para reestablecer tu contraseña, lamentamos cualquier inconveniente presentado.", { text: "Reset your password", url: link }, `Equipo PNOVA\VIGE, conoce mas en: <a class="link" href="https://pnovastudios.xyz/about">https://pnovastudios.xyz/about</a>`, user.email, `Este link solo sera valido por los proximos 15 minutos.
        Una vez pase el tiempo estimado tendras que volver a solicitar uno nuevo en nuestro sitio web.
        Si tienes alguna pregunta o feedback, no respondas a este email envianos un correo a:
        <a class="link" href="mailto:support@pnovastudios.xyz">support@pnovastudios.xyz</a>`, "Ten un excelente dia!"),
            };
            return yield this.sendEmail(mail);
        });
    }
    emailSender(subject, html, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield service.getClients();
            const emails = clients.map((client) => client.email);
            const mail = {
                from: config_1.default.email_user,
                to: [...emails],
                subject: subject,
                html: html,
            };
            return yield this.sendEmail(mail);
        });
    }
    emailStructure(greeting, info, button, farewell, clientEmail, ...paragraph) {
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
    changePassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            const sub = payload.sub;
            const user = yield service.findOne(sub);
            if (user.recoveryToken !== token) {
                throw boom_1.default.unauthorized();
            }
            const hash = yield bcryptjs_1.default.hash(newPassword, 10);
            yield service.updateOne(user._id, { recoveryToken: "", password: hash });
            return { message: "Password changes successfully!" };
        });
    }
    sendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                host: config_1.default.email_host,
                service: "gmail",
                port: 465,
                secure: true,
                auth: {
                    user: config_1.default.email_user,
                    pass: config_1.default.email_password,
                },
            };
            const transporter = nodemailer_1.default.createTransport(options);
            yield transporter.sendMail(email);
            return { message: "Email sent successfully!" };
        });
    }
}
exports.default = AuthService;
