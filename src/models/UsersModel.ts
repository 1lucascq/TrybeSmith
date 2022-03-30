import { Pool, RowDataPacket } from 'mysql2/promise';
import { IUser } from '../interfaces';

export default class UsersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IUser[]> {
    try {
      const query = 'SELECT * FROM Trybesmith.Users';
      const result = await this.connection.execute<RowDataPacket[]>(query);
      const [users] = result;
      return users as IUser[];
    } catch (err) {
      throw new Error('Erro do servidor na requisição getAll do UsersModel.');
    }
  }

  public async create(userData: IUser): Promise<void> {
    try {
      const {
        username,
        classe,
        level,
        password,
      } = userData;
      const 
        q = 'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)';
      await this.connection.execute(q, [username, classe, level, password]);
      return;
    } catch (err) {
      throw new Error('Erro do servidor na requisição create do UsersModel.');
    }
  }
}
