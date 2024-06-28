const mongodb = require('../db/connect');

const getAllMealPlans = async (req, res) => {
  const result = await mongodb.getDb().db().collection('meal_plan').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createMealPlan = async (req, res) => {
  const mealPlan = {
    name: req.body.name,
    recipes: req.body.recipes
  };

  const response = await mongodb.getDb().db().collection().insertOne(mealPlan);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating the meal plan');
  }
};

module.exports = { getAllMealPlans, createMealPlan };
