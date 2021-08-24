import { Config } from './config.interface';

export const configuration = async (): Promise<Config> => {
  const { config: environment } = await import(
    `./envs/${process.env.NODE_ENV || 'development'}`
  );
  return environment;
};
