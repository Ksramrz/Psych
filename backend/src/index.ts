import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkAuth } from './middleware/auth.js';
import webhooksRouter from './routes/webhooks.js';
import casesRouter from './routes/cases.js';
import notesRouter from './routes/notes.js';
import ethicsRouter from './routes/ethics.js';
import supervisorRouter from './routes/supervisor.js';
import ragRouter from './routes/rag.js';
import settingsRouter from './routes/settings.js';
import exportRouter from './routes/export.js';
import subscriptionsRouter from './routes/subscriptions.js';
import { deleteAllTemporaryData } from './services/storage/dataManager.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS configuration
const allowedOrigins = [
  'https://clinic.cashvers.com',
  'https://clinicsense-frontend.onrender.com', // Render frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow if in allowed list, or if development mode, or if from Render
    if (
      allowedOrigins.indexOf(origin) !== -1 || 
      process.env.NODE_ENV === 'development' ||
      origin.includes('.onrender.com') // Allow any Render subdomain
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Health check endpoint (before auth - for monitoring)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'ClinicSense API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Webhooks (before JSON middleware - Stripe webhook needs raw body)
app.use('/api/webhooks', webhooksRouter);

// Stripe webhook needs raw body
app.use('/api/subscriptions/webhook', express.raw({ type: 'application/json' }), subscriptionsRouter);

// JSON middleware for all other routes
app.use(express.json());

// Apply Clerk middleware to all routes except webhooks and health check
app.use(clerkAuth);

// API routes
app.use('/api/cases', casesRouter);
app.use('/api/notes', notesRouter);
app.use('/api/ethics', ethicsRouter);
app.use('/api/supervisor', supervisorRouter);
app.use('/api/rag', ragRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/export', exportRouter);
app.use('/api/subscriptions', subscriptionsRouter);

// Background job: Delete expired temporary data every hour
setInterval(async () => {
  try {
    await deleteAllTemporaryData();
    console.log('Cleaned up expired temporary data');
  } catch (error) {
    console.error('Error cleaning temporary data:', error);
  }
}, 60 * 60 * 1000); // Every hour

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ClinicSense backend server running on port ${PORT}`);
});

