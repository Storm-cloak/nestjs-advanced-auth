import * as path from 'path';
import { ApplicationConfigInterface } from '../types';

export const config: ApplicationConfigInterface = {
  MAILER_URL: 'https://example.mailer.com',
  SERVER_PORT: 3000,
  APP_NAME: 'rezbyme',
  IS_DEVELOPMENT: false,
  IS_PRODUCTION: true,
  ROOT_FOLDER_PATH: path.join(__dirname, '...'),

  JWT: {
    SECRET: 'kapibara',
    EXPIRES_IN: '1600s',
  },

  DATABASE: {
    DIALECT: 'postgres',
    HOST: 'localhost',
    PORT: 5432,
    USER: 'postgres',
    PASSWORD: 'admin',
    NAME: 'postgres',
    MIGRATIONS_TABLE_NAME: '',
  },

  // MAILER: {
  //   TRANSPORT: {
  //     HOST: ENV.MAILER_HOST,
  //     PORT: Number(ENV.MAILER_PORT),
  //     IS_SECURE: false, // upgrade later with STARTTLS
  //     AUTH: {
  //       USERNAME: ENV.MAILER_AUTH_USERNAME,
  //       PASSWORD: ENV.MAILER_AUTH_PASSWORD,
  //     },
  //   },
  // },
};
