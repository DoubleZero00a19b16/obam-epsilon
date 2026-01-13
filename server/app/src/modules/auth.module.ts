import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '@/controllers/auth.controller';
import { AuthService } from '@/services/auth.service';
import { UsersModule } from './users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonusCard } from '@/entities/bonus-card.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    }),
    UsersModule,
    TypeOrmModule.forFeature([BonusCard])
  ]
})
export class AuthModule {}
