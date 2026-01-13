import { User } from '@/entities/user.entity';
import { UsersService } from '@/services/users.service';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly clsService: ClsService
  ) {}

  async canActivate(context: ExecutionContext,) {
    const request = context.switchToHttp().getRequest();
    let token = request.headers["authorization"];
    // console.log(token);
    if (!token) throw new UnauthorizedException();
    token = token.split(" ")[1];    
    // console.log(token);
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
      // console.log(payload);
    } catch (error) {
      // console.log(error);
      throw new UnauthorizedException();
    }
    // console.log(payload.userId);
    const user: User = await this.usersService.findOne(payload.userId);
    // console.log(user);
    if (!user) throw new NotFoundException();
    this.clsService.set("user", user);
    return true;
  }
}