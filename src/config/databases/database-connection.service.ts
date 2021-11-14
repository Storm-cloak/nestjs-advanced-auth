import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ApplicationConfigInterface } from '../types';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  private readonly DATABASE_CONFIG: ApplicationConfigInterface['DATABASE'];
  private readonly IS_DEVELOPMENT: ApplicationConfigInterface['IS_DEVELOPMENT'];
  private readonly ROOT_FOLDER_PATH: ApplicationConfigInterface['ROOT_FOLDER_PATH'];
  constructor(
    private readonly configService: ConfigService<ApplicationConfigInterface>,
  ) {
    this.DATABASE_CONFIG = this.configService.get('DATABASE');
    this.IS_DEVELOPMENT = this.configService.get('IS_DEVELOPMENT');
    this.ROOT_FOLDER_PATH = this.configService.get('ROOT_FOLDER_PATH');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.DATABASE_CONFIG.DIALECT,

      host: this.DATABASE_CONFIG.HOST,
      port: this.DATABASE_CONFIG.PORT,

      username: this.DATABASE_CONFIG.USER,
      password: this.DATABASE_CONFIG.PASSWORD,

      database: this.DATABASE_CONFIG.NAME,
      entities: [`${this.ROOT_FOLDER_PATH}/**/*.entity{.ts,.js}`],
      logging: this.IS_DEVELOPMENT,

      autoLoadEntities: true,
      synchronize: this.IS_DEVELOPMENT,
    };
  }
}
