
export type TUserRole =  'user' | 'admin'
export type TUserGender = 'male' | 'female'

export interface TUser {
  name: string;
  email: string;
  role: TUserRole;
  password: string;
  gender:TUserGender;
  dateOfBirth:string;
  phone: string;
  isDeleted:boolean,
  isBlocked:boolean
}

export type TAuth  = {
  email: string;
  password:string
}