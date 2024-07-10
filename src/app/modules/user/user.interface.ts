
export type TUserRole =  'user' | 'admin'
export type TUserGender = 'male' | 'female'

export interface TUser {
  name: string;
  email: string;
  role: TUserRole;
  password: string;
  isDeleted:boolean,
  isBlocked:boolean
}

export type TAuth  = {
  email: string;
  password:string
}