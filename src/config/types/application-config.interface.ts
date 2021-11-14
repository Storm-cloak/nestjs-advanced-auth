export interface ApplicationConfigInterface {
  MAILER_URL: string;
  SERVER_PORT: number;
  APP_NAME: string;
  IS_DEVELOPMENT: boolean;
  IS_PRODUCTION: boolean;
  ROOT_FOLDER_PATH: string;

  JWT: {
    SECRET: string;
    EXPIRES_IN: string;
  };

  DATABASE: {
    HOST: string;
    NAME: string;
    PASSWORD: string;
    PORT: number;
    USER: string;
    DIALECT: any;
    MIGRATIONS_TABLE_NAME: string;
  };

  MAILER?: {
    TRANSPORT: {
      HOST: string;
      PORT: number;
      IS_SECURE: boolean;
      AUTH: {
        USERNAME: string;
        PASSWORD: string;
      };
    };
  };
}
