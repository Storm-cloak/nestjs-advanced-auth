import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfigInterface } from '.';

@Injectable()
export class MailerConfig implements MailerOptionsFactory {
  private readonly MAILER_CONFIG: ApplicationConfigInterface['MAILER'];
  constructor(
    private readonly configService: ConfigService<ApplicationConfigInterface>,
  ) {
    this.MAILER_CONFIG = this.configService.get('MAILER');
  }

  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: this.MAILER_CONFIG.TRANSPORT.HOST,
        port: this.MAILER_CONFIG.TRANSPORT.PORT,
        secure: this.MAILER_CONFIG.TRANSPORT.IS_SECURE,
        auth: {
          user: this.MAILER_CONFIG.TRANSPORT.AUTH.USERNAME,
          pass: this.MAILER_CONFIG.TRANSPORT.AUTH.PASSWORD,
        },
      },
    };
  }
}
