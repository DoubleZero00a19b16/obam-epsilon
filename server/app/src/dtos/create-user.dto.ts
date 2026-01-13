import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    type: "string",
    default: "Suleyman"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: "string",
    default: "Asgarov"
  })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    type: "string",
    default: "+9941234567"
  })
  @IsString()
  @Matches(/^\+\d{10,15}$/)
  @IsNotEmpty()
  phone: string;
  
  @ApiProperty({
    type: "string",
    default: "ruhi123"
  })
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @ApiProperty({
    type: 'string',
    example: '2007-08-31',
    description: 'Date of birth in ISO format (YYYY-MM-DD)'
  })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;
}
