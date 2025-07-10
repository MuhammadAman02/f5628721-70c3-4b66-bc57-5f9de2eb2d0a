import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const FruitZod = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

const GetFruitsResponseZod = z.array(FruitZod);

const GetFruitsQueryZod = z.object({
  limit: z.coerce.number().int().positive().max(50).default(10),
});

// Fastify-compatible JSON schemas
export const getFruitsSchema = {
  tags: ["Fruits"],
  querystring: zodToJsonSchema(GetFruitsQueryZod),
  response: {
    200: zodToJsonSchema(GetFruitsResponseZod),
  },
};