import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.reprository';
import { MailsModule } from '../mailer/mails.module';

@Module({
  imports: [MailsModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
