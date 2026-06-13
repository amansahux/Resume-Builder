import { Document, Model, Types } from "mongoose"

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    mobile: string,
    createdAt?: Date,
    updatedAt?: Date
}
export interface UserDocumnet extends Omit<IUser, "_id">, Document {
    comparePassword(candidatePassword: string): boolean
}
export interface RegisterBody {
    name: string,
    email: string,
    password: string,
    mobile: string,
}
export interface LoginBody {
    email: string,
    password: string,
}
export interface JWTPayload {
    userId: string,
    email?: string
}
export interface verifyTokenResponse {
    userId: Types.ObjectId
    email?:string
}
export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}