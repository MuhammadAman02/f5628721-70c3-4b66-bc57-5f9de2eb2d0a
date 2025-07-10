import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fruitRoutes } from "./routes/fruit.route";

export async function createApp() {
  const app = Fastify({
    logger: {
      level: "info",
    },
  });

  // Register Swagger documentation
  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Fruits API",
        description: "A simple API that returns fruit names from an array",
        version: "1.0.0",
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
    staticCSP: true,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  // Global error handler
  app.setErrorHandler(async (error, request, reply) => {
    console.error("Global error handler:", error);

    if (error.validation) {
      return reply.status(400).send({
        error: "Validation failed",
        details: error.validation,
      });
    }

    return reply.status(500).send({
      error: "Internal Server Error",
    });
  });

  // Health check endpoint
  app.get("/api/health", {
    schema: {
      tags: ["Health"],
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: async () => {
      return { status: "OK", message: "Fruits API is running" };
    },
  });

  // Register routes
  await app.register(fruitRoutes);

  return app;
}