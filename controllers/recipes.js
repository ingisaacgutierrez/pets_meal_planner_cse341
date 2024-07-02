const mongodb = require('../db/connect');

const getAllRecipes = async (req, res) => {
  const result = await mongodb.getDb().db('Pets_Meal_Planner').collection('recipe').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};



const createRecipe = async (req, res) => {
  const recipe = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  };
  const response = await mongodb.getDb().db('Pets_Meal_Planner').collection('recipe').insertOne(recipe);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating the recipe');
  }
};

module.exports = { getAllRecipes, createRecipe };
