import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.decorator';

ApiTags('auth');
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('register')
  registerUser(@Body() userObject: RegisterAuthDto) {
    return this.authService.register(userObject);
  }
  @Public()
  @Post('login')
  loginUser(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }
  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
