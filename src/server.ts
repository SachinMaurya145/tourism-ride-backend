import http from 'http';
import app from './app';
import { env } from './config/env';
import { connectDB, disconnectDB } from './config/db';
import redis from './config/redis';
import { initSocket } from './config/socket';

const server = http.createServer(app);

async function start(): Promise<void> {
  try {
    const dbOk = await connectDB();
    if (!dbOk) {
      console.warn('DB not connected — running in degraded mode.');
    }

    // Start server
    server.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`);
    });

    // Initialize sockets
    initSocket(server);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1); //just stop the project.
  }
}

start();

async function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down...`);

  server.close(async (err) => {
    if (err) console.error('Error closing server:', err);
    try {
      await disconnectDB();
      if (redis && typeof (redis as any).quit === 'function') await (redis as any).quit();
      console.log('Shutdown complete');
      process.exit(0);
    } catch (e) {
      console.error('Error during shutdown:', e);
      process.exit(1);
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
