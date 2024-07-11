const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

// MEAL PLAN
const mealPlanValidate = (req, res, next) => {
  const mealPlanValidationRules = {
    userId: 'string',
    petId: 'string',
    recipes: 'string',
    date: 'string'
  };
  validator(req.body, mealPlanValidationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
// PETS
const petsValidate = (req, res, next) => {
  const petsValidationRules = {
    userId: 'required|string',
    name: 'required|string',
    species: 'required|string',
    breed: 'required|string',
    age: 'string',
    mealPlans: 'string'
  };
  validator(req.body, petsValidationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

//RECIPES

const recipeValidate = (req, res, next) => {
  const recipeValidationRules = {
    title: 'required|string',
    ingredients: 'required|string',
    instructions: 'required|string',
    calories: 'string',
    protein: 'string',
    fat: 'string',
    carbohydrates: 'string'
  };
  validator(req.body, recipeValidationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

//USER
const userValidate = (req, res, next) => {
  const userValidateRules = {
    username: 'required|string',
    email: 'required|email',
    password: 'required|string|min:8',
    pets: 'string',
    mealPlans: 'string'
  };
  validator(req.body, userValidateRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
//USERSSS
const usersValidate = (req, res, next) => {
  const userValidationRules = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    password: 'required|string|min:8'
  };
  validator(req.body, userValidationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  usersValidate,
  userValidate,
  recipeValidate,
  petsValidate,
  mealPlanValidate
};
