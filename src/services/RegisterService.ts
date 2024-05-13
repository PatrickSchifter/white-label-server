import UserRepository from '../repository/UserRepository';
import { ConfirmationEmailSender } from './ConfirmationEmailSenderService';
import { UserCreate } from '../interfaces/UserInterface';
export class RegisterService {
  private userRepository: UserRepository;
  private confirmationEmailSender: ConfirmationEmailSender;

  constructor() {
    this.userRepository = new UserRepository();
    this.confirmationEmailSender = new ConfirmationEmailSender();
  }

  async register(data: UserCreate) {
    const emailExists = await this.userRepository.findByEmail({
      email: data.email,
    });

    if (emailExists) {
      throw new Error('User already exists');
    }

    const userData = await this.userRepository.createUser(data);
    await this.confirmationEmailSender.sendEmail(
      userData.email,
      userData.id.toString()
    );
    return { userData };
  }

  async confirmEmail({ id }: { id: number }): Promise<{ confirmed: boolean }> {
    await this.userRepository.confirmEmail({ id });
    return { confirmed: true };
  }
}
