import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(html: string, to: string, subject: string) {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html,
    };

    this.mailService.sendMail({ ...mailOptions, attachDataUrls: true });
  }
}
