import {
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './model/AuthRequest';
import { IsPublic } from './decorator/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('sigin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  sigIn(@Request() req: AuthRequest) {
    return this.authService.signIn(req.user);
  }
}
