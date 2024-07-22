import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';

export class SingUpDto {
  @IsOptional()
  @ApiPropertyOptional({
    example: 'patch2000@mail.com',
    description: 'Email del usuario',
  })
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'patch2000',
    description: 'Username del usuario',
  })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({
    example: '123qweASD.!@',
    description: 'Password del usuario',
  })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.,_-])([A-Za-z\d$@$!%*?&.,_-]|[^ ]){8,15}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
}
