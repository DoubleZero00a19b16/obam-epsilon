import { loginDto } from '@/dtos/create-auth.dto';
import { RegisterDto } from '@/dtos/register-auth.dto';
import { AuthService } from '@/services/auth.service';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'User login',
    description: 'Authenticate user with phone and password'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      example: {
        status: true,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Orkhan',
          surname: 'Aliyev',
          phone: '+994501234567'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid credentials' 
  })
  login(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'User registration',
    description: 'Create a new user account'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Registration successful',
    schema: {
      example: {
        status: true,
        message: 'User registered successfully',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Orkhan',
          surname: 'Aliyev',
          phone: '+994501234567'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Phone number already exists' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Validation error' 
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}