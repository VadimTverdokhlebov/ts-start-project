import { AppDataSource as dataSource } from '../data-source';
import { User } from '../entity/User';

export async function createUser(userData: Partial<User>): Promise<User> {
  const userRepository = dataSource.getRepository(User);
  const user = userRepository.create(userData);
  return await userRepository.save(user);
}

export async function getUsers(): Promise<User[]> {
  const userRepository = dataSource.getRepository(User);
  return await userRepository.find();
}

export async function checkUser(email: string): Promise<User | null> {
  const userRepository = dataSource.getRepository(User);
  return await userRepository.findOne({ where: { email } });
}

export async function updateUserData(email: string, userData: Partial<User>): Promise<void> {
  const userRepository = dataSource.getRepository(User);
  await userRepository.update({ email }, userData);
}

export async function getUser(id: string): Promise<User | null> {
  const userRepository = dataSource.getRepository(User);
  return await userRepository.findOne({ where: { id } });
}
