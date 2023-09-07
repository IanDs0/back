import { Request } from 'express';
import { User } from '../../model/user/entities/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
