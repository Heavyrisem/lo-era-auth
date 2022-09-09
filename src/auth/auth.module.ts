import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { GoogleStrategy } from '~src/modules/auth/google.strategy';
import { JwtModule } from '~src/modules/jwt/jwt.module';
import { UserModule } from '~src/user/user.module';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
