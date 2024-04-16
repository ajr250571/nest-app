import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  name: string;
  @MinLength(4)
  @MaxLength(12)
  @IsNotEmpty()
  password: string;
}
