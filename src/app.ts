import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { swaggerUi, swaggerSpec } from './swagger';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';

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
  res.json({ status: 'ok' });
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

export default app;
