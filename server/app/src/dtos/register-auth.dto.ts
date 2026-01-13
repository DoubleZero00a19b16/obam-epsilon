import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength, IsOptional, IsDateString } from "class-validator";

export class RegisterDto {
  @ApiProperty({
    description: 'User first name',
    example: 'Orkhan',
    type: 'string'
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  
  @ApiProperty({
    description: 'User surname',
    example: 'Aliyev',
    type: 'string'
  })
  @IsString()
  @IsOptional()
  surname: string;

  @ApiProperty({
    description: 'Phone number in international format',
    example: '+994501234567',
    type: 'string'
  })
  @IsString()
  @Matches(/^\+\d{10,15}$/, { 
    message: 'Phone must be in international format (e.g., +994501234567)' 
  })
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;
  
  @ApiProperty({
    description: 'User password (minimum 6 characters)',
    example: 'salam123',
    type: 'string',
    minLength: 6
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'Date of birth',
    example: '1995-05-15',
    type: 'string',
    format: 'date',
    required: false
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth: string;
}