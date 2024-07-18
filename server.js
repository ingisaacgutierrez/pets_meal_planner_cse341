require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('./routes'); // Main application routes
const authRoutes = require('./routes/auth'); // Authentication routes
const mongodb = require('./db/connect'); // MongoDB connection script
require('./config/passport'); // Passport configuration

const app = express();
const port = process.env.PORT || 3030;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// OAuth Routes
app.use('/auth', authRoutes);

// Main routes
app.use('/', routes);

// Initialize MongoDB connection
mongodb.initDb((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port} and is connected to the database`);
    });
  }
});
