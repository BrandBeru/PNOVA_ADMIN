interface IUser{
  username: String;
  name: String;
  lastName: String;
  email: String,
  password: String,
  role: String,
  recoveryToken: String,
  provider: String,
  meta: {
    createdDate: String;
    modifiedDate: String;
    isActive: Boolean;
  }
}
