import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { swaggerUi, swaggerSpec } from './swagger';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';

import { errorMiddleware } from './middlewares/error.middleware';
import { HTTP_STATUS, HTTP_MESSAGE } from './utils/httpStatus';

const app = express();

// --------------------
// Global Middleware
// --------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// --------------------
// Health Check
// --------------------
app.get('/health', (_req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    statusCode: HTTP_STATUS.OK,
    path: '/health',
    message: HTTP_MESSAGE.OK,
    data: { status: 'ok' },
    timestamp: new Date().toISOString(),
  });
});

// --------------------
// API Versioning
// --------------------
const API_V1 = '/api/v1';

app.use(`${API_V1}/auth`, authRoutes);
app.use(`${API_V1}/users`, userRoutes);

// --------------------
// Swagger Docs
// --------------------
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --------------------
// 404 Handler (IMPORTANT)
// --------------------
app.use((_req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    statusCode: HTTP_STATUS.NOT_FOUND,
    path: _req.originalUrl,
    message: HTTP_MESSAGE.NOT_FOUND,
    timestamp: new Date().toISOString(),
  });
});

// --------------------
// Global Error Handler (MUST BE LAST)
// --------------------
app.use(errorMiddleware);

export default app;
