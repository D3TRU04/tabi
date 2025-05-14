import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: string;
}

export function requireAuth(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing authorization header.' });
    }
    const token = auth.replace('Bearer ', '');
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.userId = payload.userId;
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
}
