import { Router } from 'express';
import { register, login } from '@/controllers/auth.controller';
import { validateRegisterData, validateLoginData } from '@/middleware/validation.middleware';

const router = Router();

// POST /api/auth/register
router.post('/register', validateRegisterData, register);

// POST /api/auth/login
router.post('/login', validateLoginData, login);

export default router;
