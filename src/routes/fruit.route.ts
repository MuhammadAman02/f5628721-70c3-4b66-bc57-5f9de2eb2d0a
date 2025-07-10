import { FastifyInstance } from 'fastify';
import { getFruitsHandler } from '../controllers/fruit.controller';
import { getFruitsSchema } from '../schemas/fruit.schema';

export async function fruitRoutes(app: FastifyInstance) {
  app.get('/api/fruits', {
    schema: getFruitsSchema,
    handler: getFruitsHandler,
  });
}