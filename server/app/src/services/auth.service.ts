import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { loginDto } from '@/dtos/create-auth.dto';
// import { RegisterDto } from '@/dtos/register.dto';
import { User } from '@/entities/user.entity';
import { RegisterDto } from '@/dtos/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BonusCard } from '@/entities/bonus-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(BonusCard)
    private bonusCardRepository: Repository<BonusCard>
  ) {}

  /**
   * User login
   */
  async login({ password, phone }: loginDto) {
    // Find user by phone
    const user: User | null = await this.usersService.findOneByUsername(
      { phone }, 
      { password: true, id: true, name: true, surname: true, phone: true, bonusBalance: true }
    );

    
    if (!user) {
      throw new HttpException(
        'Username or password is incorrect!',
        HttpStatus.BAD_REQUEST
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(isPasswordValid);
    

    if (!isPasswordValid) {
      throw new HttpException(
        'Username or password is incorrect!',
        HttpStatus.BAD_REQUEST
      );
    }

    // Generate JWT token
    const token = this.jwtService.sign({ userId: user.id });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      status: true,
      token,
      user: userWithoutPassword
    };
  }

  /**
   * User registration
   */
  async register({ name, surname, phone, password, dateOfBirth }: RegisterDto) {
    // Check if phone already exists
    const existingUser = await this.usersService.findOneByUsername({ phone });

    if (existingUser) {
      throw new HttpException(
        'Phone number is already registered',
        HttpStatus.CONFLICT
      );
    }


    // Create new user
    const newUser = await this.usersService.create({
      name,
      surname,
      phone,
      password,
      dateOfBirth
    });

    // Generate JWT token
    const token = this.jwtService.sign({ userId: newUser.id });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    const bonusCard = this.bonusCardRepository.create({
      userId: newUser.id,
      isActive: true
    });
    await this.bonusCardRepository.save(bonusCard);

    return {
      status: true,
      message: 'User registered successfully',
      bonusCard,
      token,
      user: userWithoutPassword
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}