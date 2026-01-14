import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Role, User } from '../entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly clsService: ClsService) { }

  canActivate(context: ExecutionContext): boolean {
    const user = this.clsService.get<User>('user');

    if (user?.role !== Role.ADMIN) {
      throw new ForbiddenException('Access denied. Admin role required.');
    }

    return true;
  }
}
