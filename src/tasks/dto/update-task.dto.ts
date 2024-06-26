import { IsString, MaxLength, MinLength } from 'class-validator';

export class updateTaskDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title?: String;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  description?: string;
}
