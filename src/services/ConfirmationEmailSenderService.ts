import { EmailService } from './EmailService';
import { config } from '../config/config';
import { getConfirmationEmail } from '../utils/htmlConfirmationEmail';

export class ConfirmationEmailSender {
  private readonly emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async sendEmail(email: string, id: string): Promise<void> {
    const emailData = {
      to: [email],
      subject: 'Confirmation Email Pocket Guardian',
      html: getConfirmationEmail(config.email.link_confirmation + id || ''),
    };

    try {
      const response = await this.emailService.send(
        email,
        emailData.subject,
        emailData.html
      );
      console.log(response);
    } catch (error) {
      console.error('An error occurred while sending the email:', error);
    }
  }
}
