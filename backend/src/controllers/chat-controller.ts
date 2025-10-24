import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import OpenAI from 'openai';
import { configureOpenAI } from '../config/openai-config.js';
import { ChatCompletionMessageParam } from 'openai/resources.mjs';

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: 'User not registered OR Token malfunctioned' });
    // grab chat of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionMessageParam[];
    chats.push({ content: message, role: 'user' });
    user.chats.push({ content: message, role: 'user' });

    // send chats to the openAI API
    const config = configureOpenAI();
    const openai = new OpenAI(config);
    // get latest response
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: chats,
    });
    user.chats.push(chatResponse.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const sendChatsToUser = async (
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
      return res.status(401).json({
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
    return res.status(200).json({ message: 'OK', chats: user.chats });
  } catch (error) {
    console.error('User verification error:', error);
    return res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};
