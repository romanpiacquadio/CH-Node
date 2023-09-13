export const swaggerOpts = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion con swagger para ECOMMERCE API",
      description: "API ECOMMERCE, como usar los endpoints",
      version: "1.0.0",
    },
  },
  apis: ['./src/docs/**/*.yml'],
}