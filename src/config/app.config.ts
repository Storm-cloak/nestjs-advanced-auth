import { ApplicationConfigInterface } from './types';

export const InitAppConfig = async (): Promise<ApplicationConfigInterface> => {
  const { config }: { config: ApplicationConfigInterface } = await import(
    `./envs/${process.env.NODE_ENV || 'development'}`
  );
  return config;
};
