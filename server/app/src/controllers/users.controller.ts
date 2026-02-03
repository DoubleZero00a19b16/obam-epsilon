import { CreateUserDto } from '@/dtos/create-user.dto';
import { UpdateUserDto } from '@/dtos/update-user.dto';
import { AdminGuard } from '@/guards/admin.guard';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { UsersService } from '@/services/users.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiParam, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { v5 as uuidv5 } from "uuid"
import { PaginationParamsDto } from '@/dtos/pagination.dto';

@Controller('users')
@ApiTags("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiResponse({ status: 200, description: 'Return paginated users' })
  findAll(@Query() query: PaginationParamsDto) {
    return this.usersService.findAll(query);
  }

  @Get('/me')
  getMe() {
    return this.usersService.getMe();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      let errorMessage = {
        statusCode: 404,
        message: error.message
      }
      return errorMessage
    }
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}