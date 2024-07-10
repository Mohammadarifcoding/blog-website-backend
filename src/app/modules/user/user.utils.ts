import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { TUserRole } from './user.interface';

export const UserRoleValidation = ['user', 'admin'];
export const createToken = (
  jwtPayload: {
    name: string;
    email: string;
    role: TUserRole;
    isDeleted: boolean;
    isBlocked: boolean;
    _id: Types.ObjectId;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
