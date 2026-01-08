import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger configuration for swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tourism Ride API',
      version: '1.0.0',
      description: 'API documentation for the Tourism Ride backend',
    },
  },
  // Files containing OpenAPI definitions in JSDoc comments
  apis: ['./src/swagger/*.swagger.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
