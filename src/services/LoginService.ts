import LoginModel from '../models/LoginModel';
import connection from '../models/connection';

import { ILogin, IUser } from '../interfaces';

export default class LoginService {
  public loginModel: LoginModel;

  constructor() {
    this.loginModel = new LoginModel(connection);
  }

  public async login(loginData: ILogin) {
    const users: IUser[] = await this.loginModel.getAll();
    const { username, password } = loginData;
 
    const isValidLoginData = () => users.filter((user) => {
      if (user.username === username && user.password === password) return true;
      return false;
    });
    
    const [user] = isValidLoginData();

    if (!user) return false;

    return user.id;
  }
}

// public async login(loginData: ILogin) {
//   const user: IUser = await this.loginModel.login(loginData);
//   const { id, password } = user;
  
//   // if (!this.isValidPassword(loginData.password, password)) return false;
//   if (!LoginService.isValidPassword(loginData.password, password)) return false;

//   return id;
// }