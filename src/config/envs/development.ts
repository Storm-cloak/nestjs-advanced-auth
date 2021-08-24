export const config = {
  apiURL: process.env.API_URL,
  port: Number(process.env.PORT),
  jwt: {
    jwtSecret: process.env.JWT_SECRET_KEY,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '../../../**/*.entity.{ts,js}'],
    synchronize: true,
    logging: false,
  },
  mailer: {
    transport: {
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.MAILER_AUTH_USERNAME,
        pass: process.env.MAILER_AUTH_PASSWORD,
      },
    },
  },
};
