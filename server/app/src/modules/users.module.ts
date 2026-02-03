import { UsersController } from '@/controllers/users.controller';
import { BonusCard } from '@/entities/bonus-card.entity';
import { User } from '@/entities/user.entity';
import { UsersService } from '@/services/users.service';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, BonusCard]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
