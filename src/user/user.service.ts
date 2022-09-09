import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

import { GoogleUser } from '~src/modules/auth/google.strategy';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findUserById(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) throw new NotFoundException('User Not Found');

    return findUser;
  }
  async findUserByGoogleOrSave(user: GoogleUser) {
    const existUser = await this.userRepository.findOne({ where: { providerId: user.providerId } });
    if (existUser) return existUser;

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
}
