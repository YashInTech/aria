import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';

// Protected API Route
const chatRouter = Router();
chatRouter.post('/new', validate(chatCompletionValidator), verifyToken);

export default chatRouter;
