import { clerkMiddleware, getAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';
import { getUserByClerkId, ensureUser } from '../services/supabase.js';

export const clerkAuth = clerkMiddleware();

export interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Get user from database; create if missing
    let user = await getUserByClerkId(userId);
    if (!user) {
      user = await ensureUser(userId, null);
    }

    req.userId = userId;
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
}

