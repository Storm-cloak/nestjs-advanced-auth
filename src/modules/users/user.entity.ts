import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  phone_number: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  salt: string;

  @Column()
  refresh_token: string;

  @Column({ default: 0 })
  bonus_balance: number;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
