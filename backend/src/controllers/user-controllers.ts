import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { compare, hash } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all users
    console.log('Fetching all users from database...');
    const users = await User.find();
    console.log('Found users:', users.length);
    return res.status(200).json({ message: 'OK', users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user signup
    const { name, email, password } = req.body;
    console.log('Signup attempt:', { name, email });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res
        .status(401)
        .json({ message: 'ERROR', cause: 'User already exists' });
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    const savedUser = await user.save();
    console.log('User created successfully:', savedUser._id);

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'ERROR', cause: 'User not registered' });
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(403)
        .json({ message: 'ERROR', cause: 'Incorrect Password' });
    }

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    console.log('Verifying user with ID:', res.locals.jwtData.id);
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      console.log('User not found in database');
      return res
        .status(401)
        .json({
          message: 'ERROR',
          cause: 'User not registered OR Token malfunctioned',
        });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      console.log('User ID mismatch');
      return res
        .status(401)
        .json({ message: 'ERROR', cause: 'Permission Denied' });
    }
    console.log('User verification successful:', user.email);
    return res
      .status(200)
      .json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.error('User verification error:', error);
    return res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};
