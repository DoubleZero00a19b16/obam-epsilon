import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class loginDto {
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
    default: "salam123"
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
