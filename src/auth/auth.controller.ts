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

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sigin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  sigIn(@Request() req: AuthRequest) {
    return this.authService.signIn(req.user);
  }

  @Get('sigup')
  sigUp() {
    // return this.authService.sigup();
  }
}
