import { User } from '../models/user';
import { sequelize } from '../config/database.config';

export async function createUser(userData: Partial<User>): Promise<User> {
  const user = await User.create(userData);
  return user;
}

export async function getAllUsers(): Promise<User[]> {
  const users = await User.findAll();
  return users;
}

export async function getUserById(id: number): Promise<User | null> {
  const user = await User.findByPk(id);
  return user;
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const user = await User.findOne({ where: { username: username } });
  return user;
}

export async function updateUser(id: number, userData: Partial<User>): Promise<User | null> {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }
  await user.update(userData);
  return user;
}

export async function deleteUser(id: number): Promise<void> {
  await User.destroy({ where: { id } });
}
