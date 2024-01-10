interface IUser{
  username: String;
  name: String;
  lastName: String;
  email: String,
  password: String,
  role: String,
  recoveryToken: String,
  meta: {
    createdDate: String;
    modifiedDate: String;
    isActive: Boolean;
  }
}
