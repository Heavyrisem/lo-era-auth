import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { AuthService } from './auth.service';

import { AuthUser } from '~src/modules/auth/auth-user.decorator';
import { GoogleUser } from '~src/modules/auth/google.strategy';
import { UserService } from '~src/user/user.service';
import { User } from '~src/user/user.entity';
import { AuthedUser } from '~src/modules/auth/authed-user.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/test')
  @UseGuards(AuthedUser)
  authTest(@AuthUser() user: User) {
    return user;
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  googleAuthCallback() {
    return null;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Query('state') state: string,
    @AuthUser() user: GoogleUser,
    @Res() res: Response,
  ) {
    const { id, email, name } = await this.userService.findUserByGoogleOrSave(user);
    const token = this.authService.createToken({ id, email, name });

    const { next } = JSON.parse(state);
    res.redirect(`${next}?token=${token}`);
  }
}

// localhost:3000/auth/google?next=/lo-era/nextpage
