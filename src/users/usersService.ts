import UserModel, { IUser } from './userModel';

export default class UsersService {
  constructor(private model: typeof UserModel) {}

  async findAll(): Promise<IUser[]> {
    return this.model.find();
  }

  async findOneByEmail(email: string): Promise<IUser> {
    return this.model.findOne({ email });
  }

  async findOneById(id: string): Promise<IUser> {
    const user = await this.model.findById(id);

    return user;
  }

  async findByIds(ids: string[]): Promise<IUser[]> {
    const users = await this.model
      .find()
      .where('_id')
      .in(ids);
    const sortedUsers = ids.map(id => users.find(u => u.id == id));
    return sortedUsers;
  }

  async create(data: any): Promise<IUser> {
    const user = await this.model.create(data);
    return user;
  }
}
