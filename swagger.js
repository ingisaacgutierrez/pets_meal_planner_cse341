const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Restaurant API'
  },
  //host: 'render link',
  //schemes: ['https']
  host: 'localhost:3030',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = [ './routes/index.js', './routes/users.js',
   './routes/pets.js', './routes/recipes.js', './routes/meal-plans.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import('./routes/index.js');
});
