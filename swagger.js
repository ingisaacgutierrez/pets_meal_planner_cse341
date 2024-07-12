const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Restaurant API'
  },
  //host: 'localhost:3030',
  //schemes: ['http']
  host: 'pets-meal-planner-cse341-3wy5.onrender.com',
  schemes: ['https']
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
