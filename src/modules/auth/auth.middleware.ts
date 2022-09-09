import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { UserService } from '~src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      if ('authorization' in req.headers) {
        const token = req.headers['authorization'];
        this.jwtService.verify(token.toString());
        const decoded = this.jwtService.decode(token.toString());

        if (typeof decoded === 'object' && decoded['id'] !== undefined) {
          const user = await this.userService.findUserById(decoded['id']);
          req['user'] = user;
        }
      }

      next();
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('JwtToken verify failed');
    }
  }
}
