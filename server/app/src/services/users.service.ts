import { CreateUserDto } from '@/dtos/create-user.dto';
import { UpdateUserDto } from '@/dtos/update-user.dto';
import { User } from '@/entities/user.entity';
import { BonusCard } from '@/entities/bonus-card.entity';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClsService } from 'nestjs-cls';
import { PaginatedResponseDto, PaginationParamsDto } from '@/dtos/pagination.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(BonusCard)
    private bonusCardRepo: Repository<BonusCard>,
    private readonly clsService: ClsService
  ) { }

  /**
   * Create a new user
   * Note: Password should already be hashed when calling this method
   */
  async create({ name, surname, phone, password, dateOfBirth }: CreateUserDto): Promise<User> {
    try {
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

      console.log('User created:', newUser.id);

      // Create bonus card for the new user
      const bonusCard = this.bonusCardRepo.create({
        userId: newUser.id,
        isActive: true
      });
      await this.bonusCardRepo.save(bonusCard);
      console.log('Bonus card created');

      return await this.userRepo.findOne({
        where: { id: newUser.id },
        relations: ["bonusCard"]
      }) as User;
    } catch (error) {
      console.error('Error in UsersService.create:', error);
      throw error;
    }
  }

  /**
   * Find all users with pagination
   */
  async findAll(params: PaginationParamsDto): Promise<PaginatedResponseDto<User>> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepo.findAndCount({
      relations: ["bonusCard"],
      take: limit,
      skip: skip,
      order: { createdAt: 'DESC' }
    });

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Find one user by ID
   */
  async findOne(id: string): Promise<User> {
    const user: User | null = await this.userRepo.findOne({
      where: { id },
      relations: ["bonusCard"],
    });

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

    Object.assign(user, updateUserDto);

    await this.userRepo.save(user);

    return user;
  }

  /**
   * Remove user
   */
  async remove(id: string): Promise<User> {
    const user: User = await this.findOne(id);
    await this.userRepo.remove(user);
    return user;
  }
}