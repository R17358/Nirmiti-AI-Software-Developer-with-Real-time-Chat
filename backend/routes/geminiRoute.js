import express from 'express';
import { generateResult } from '../controllers/gemini.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.route('/ai').get(generateResult);

export default router;