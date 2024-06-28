const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var mongodbClient = require('mongodb');
var mongodb = require('./db/connect');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = process.env.PORT || 3030;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes'));

app.use('/user', require('./routes/users.js'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port} :) and is connected to DataBase :)`);
    });
  }
});

// app.listen(port, () => {
//   console.log(`Running on port ${port}`);
// });
