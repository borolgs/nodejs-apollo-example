import asyncHandler from './asyncHandler';
import { AuthError } from '../common/errors';
import jwt from 'jsonwebtoken';
import services from '../services';
import { JWT_SECRET } from '../config';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  if (!token) {
    return next(new AuthError('Not authorized'));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await services.usersService.findOneById(decoded['id']);
    next();
  } catch (err) {
    return next(new AuthError('Not authorized'));
  }
});

export default protect;
