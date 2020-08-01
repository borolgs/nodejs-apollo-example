import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE } from '../config';

export interface IUser extends Document {
  id: string;
  email: string;
  name: string;
  password: string;
  matchPassword: (pass: string) => boolean;
  getSignedJwtToken: () => string;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.pre<IUser>('remove', async function(next) {
  await this.model('Post').deleteMany({ author: this._id });
  next();
});

UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(this.password, salt);

  this.password = passHash;
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

export default mongoose.model<IUser>('User', UserSchema);
