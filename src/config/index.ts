import dotenv from 'dotenv';
dotenv.config();

export const MODE = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 8000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '1d';
export const JWT_COOKIE_EXPIRE = parseInt(process.env.JWT_COOKIE_EXPIRE, 10) || 1;
