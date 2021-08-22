import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailsService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendActivationLink(activationLink: string, email: string) {
    // console.log(this.configService.get('mailer'));
    this.mailerService
      .sendMail({
        to: email, // list of receivers
        from: this.configService.get('mailer').transport.auth.user, // sender address
        subject:
          'Sending activation link  on ✔' + this.configService.get('apiURL'), // Subject line
        text: 'Nice to meet you!', // plaintext body
        html: `<div>
                  <h1>Activate your account</h1>
                  <a href="${activationLink}">${activationLink}</a>
               </div>
               `, // HTML body content
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log('KEK', err);
      });
  }
}
