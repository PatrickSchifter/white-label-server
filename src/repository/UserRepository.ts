import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../utils/password';
import { UserCreate } from '../interfaces/UserInterface';

const prisma = new PrismaClient();

class UserRepository {
  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async findByEmail({ email }: { email: string }) {
    const users = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return users;
  }

  async findById({ id }: { id: number }) {
    const users = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return users;
  }

  async createUser(data: UserCreate) {
    const user = await prisma.user.create({
      data: {
        ...data,
        password: await encryptPassword(data.password),
      },
    });
    return user;
  }

  async confirmEmail({ id }: { id: number }) {
    return await prisma.user.update({
      data: {
        confirmed_email: true,
      },
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
