import { CreateUserDto } from '@/dtos/create-user.dto';
import { UpdateUserDto } from '@/dtos/update-user.dto';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { UsersService } from '@/services/users.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { v5 as uuidv5 } from "uuid"

@Controller('users')
@ApiTags("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      let errorMessage = {
        statusCode: 409,
        message: error.message
      }
      return errorMessage;
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/me')
  getMe() {
    return this.usersService.getMe();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(uuidv5(id, uuidv5.DNS));
    } catch (error) {
      let errorMessage = {
        statusCode: 404,
        message: error.message
      }
      return errorMessage
    }
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(uuidv5(id, uuidv5.DNS));
  }
}