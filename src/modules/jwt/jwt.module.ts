import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

const nestJwtModule = NestJwtModule.register({
  privateKey: Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64').toString(),
  publicKey: Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString(),
  signOptions: { algorithm: 'RS256', expiresIn: process.env.JWT_EXPIRES_IN },
});

@Module({
  imports: [nestJwtModule],
  exports: [nestJwtModule],
})
export class JwtModule {}
