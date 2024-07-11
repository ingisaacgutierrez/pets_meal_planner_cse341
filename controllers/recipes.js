const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;

const getAllRecipes = async (req, res) => {
  const result = await mongodb.getDb().db('Pets_Meal_Planner').collection('recipe').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleRecipe = async (req, res) => {
  const recipeId = new objectId(req.params.id);

  const result = await mongodb
    .getDb()
    .db('Pets_Meal_Planner')
    .collection('recipe')
    .find({ _id: recipeId });

  result.toArray().then((list) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(list);
  });
};

const createRecipe = async (req, res) => {
  const recipe = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    nutrition: req.body.nutrition
  };
  const response = await mongodb
    .getDb()
    .db('Pets_Meal_Planner')
    .collection('recipe')
    .insertOne(recipe);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating the recipe');
  }
};

const updateRecipe = async (req, res) => {
  const recipeId = new objectId(req.params.id);

  const recipe = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    nutrition: req.body.nutrition
  };

  const response = await mongodb
    .getDb()
    .db('Pets_Meal_Planner')
    .collection('recipe')
    .replaceOne({ _id: recipeId }, recipe);
  if (response.acknowledged) {
    res.status(202).json(recipe);
  } else {
    res.status(402).json(recipe.error || 'OOPS something went wrong');
  }
};

const deleteRecipe = async (req, res) => {
  const recipeId = new objectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db('Pets_Meal_Planner')
    .collection('recipe')
    .deleteOne({ _id: recipeId });

  if (response.acknowledged > 0) {
    res.status(205).json('Recipe Succesfully Deleted');
  } else {
    res.status(405).json(response.err || 'OOPS Something went wrong');
  }
};

module.exports = { getAllRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe };
