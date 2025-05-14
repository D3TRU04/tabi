import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../db';

const router = Router();

// Register new user
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required.' });
    }

    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ error: 'Email already in use.' });
        }

        const hashed = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: { email, password: hashed }
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '7d'
        });

        res.status(201).json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed.' });
    }
});

// Login existing user
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required.' });
    }

    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ error: 'Email already in use.' });
        }

        const hashed = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: { email, password: hashed }
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '7d'
        });

        return res.status(201).json({ token, user: { id: user.id, email: user.email } });
    } catch (err: any) {
        console.error('▶️ Registration error:', err);
        // Return the real message for now—just in development
        return res.status(500).json({ error: err.message });
    }
});

export default router;
