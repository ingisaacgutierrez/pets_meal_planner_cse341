const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pet Meal Plan API',
    description: 'An API that contains users, their pets and corresponding meal plans.'
  },
  //host: 'render link',
  //schemes: ['https']
  host: 'pets-meal-planner-cse341-3wy5.onrender.com',
  schemes: ['https'],
  tags: ['Users', 'Pets', 'Recipes', 'Meal Plans']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, routes, doc);
