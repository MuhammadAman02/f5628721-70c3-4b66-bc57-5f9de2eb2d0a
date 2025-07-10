import { createApp } from './app';
import { env } from './config/env';

async function start() {
  try {
    const app = await createApp();
    
    await app.listen({ 
      port: env.PORT, 
      host: '0.0.0.0' 
    });
    
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    console.log(`📚 API Documentation available at http://localhost:${env.PORT}/docs`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

start();