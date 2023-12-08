interface IUser{
  username: String;
  name: String;
  lastName: String;
  email: String,
  password: String,
  role: String,
  meta: {
    createdDate: String;
    modifiedDate: String;
  }
}
