const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/productsRouter.js', './routes/salesRouter.js'];

swaggerAutogen(outputFile, endpointsFiles);
