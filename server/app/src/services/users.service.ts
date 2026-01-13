import { CreateUserDto } from '@/dtos/create-user.dto';
import { UpdateUserDto } from '@/dtos/update-user.dto';
import { User } from '@/entities/user.entity';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly clsService: ClsService
  ) {}

  /**
   * Create a new user
   * Note: Password should already be hashed when calling this method
   */
  async create({ name, surname, phone, password, dateOfBirth }: CreateUserDto): Promise<User> {
    // Check if user already exists
    const isUserExist: boolean = !!(await this.findOneByUsername({ phone }));
    
    if (isUserExist) {
      throw new ConflictException('Phone number has already been taken!');
    }

    // Create new user (password should already be hashed by auth service)
    const newUser: User = this.userRepo.create({ 
      name, 
      surname, 
      phone, 
      dateOfBirth, 
      password 
    });

    await this.userRepo.save(newUser);
    
    return newUser;
  }

  /**
   * Find all users
   */
  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepo.find({
      relations: ["bonusCard"],
      select: { bonusCard: true }
    });
    return users;
  }

  /**
   * Find one user by ID
   */
  async findOne(id: UUID): Promise<User> {
    const user: User | null = await this.userRepo.findOneBy({ id });
    
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    
    return user;
  }

  async getMe() {
    const user: User = await this.clsService.get('user');
    return user;
  }

  /**
   * Find one user by custom criteria
   */
  async findOneByUsername(
    where?: FindOptionsWhere<User>, 
    select?: FindOptionsSelect<User>, 
    relations?: FindOptionsRelations<User>
  ): Promise<User | null> {
    const user: User | null = await this.userRepo.findOne({ 
      where, 
      select, 
      relations 
    });
    
    return user;
  }

  /**
   * Update user
   */
  async update(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // If password is being updated, hash it
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }

    Object.assign(user, updateUserDto);
    
    await this.userRepo.save(user);
    
    return user;
  }

  /**
   * Remove user
   */
  async remove(id: UUID): Promise<User> {
    const user: User = await this.findOne(id);
    await this.userRepo.remove(user);
    return user;
  }
}