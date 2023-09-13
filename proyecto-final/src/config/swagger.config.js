export const swaggerOpts = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documenting ECOMMERCE API with Swagger",
      description: "API ECOMMERCE, how to use the endpoints:",
      version: "1.0.0",
    },
  },
  apis: ['./src/docs/**/*.yml'],
}