const { body, validationResult, param } = require('express-validator');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllMealPlans = async (req, res) => {
  try {
    const result = await mongodb.getDb().db("Pets_Meal_Planner").collection('meal_plan').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving meal plans', error });
  }
};

const getSingleMealPlan = [
  param('id').isMongoId().withMessage('Invalid meal plan ID'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getDb().db("Pets_Meal_Planner").collection('meal_plan').findOne({ _id: userId });

      if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Meal plan not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while retrieving the meal plan', error });
    }
  }
];

const createMealPlan = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('petId').notEmpty().withMessage('Pet ID is required'),
  body('recipes').isArray().withMessage('Recipes must be an array'),
  body('date').isISO8601().withMessage('Date must be a valid date'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const mealPlan = {
      userId: req.body.userId,
      petId: req.body.petId,
      recipes: req.body.recipes,
      date: req.body.date
    };

    try {
      const response = await mongodb.getDb().db("Pets_Meal_Planner").collection('meal_plan').insertOne(mealPlan);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json({ message: 'An error occurred while creating the meal plan.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the meal plan', error });
    }
  }
];

const updateMealPlan = [
  param('id').isMongoId().withMessage('Invalid meal plan ID'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('petId').notEmpty().withMessage('Pet ID is required'),
  body('recipes').isArray().withMessage('Recipes must be an array'),
  body('date').isISO8601().withMessage('Date must be a valid date'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = new ObjectId(req.params.id);
    const mealPlan = {
      userId: req.body.userId,
      petId: req.body.petId,
      recipes: req.body.recipes,
      date: req.body.date
    };

    try {
      const response = await mongodb.getDb().db("Pets_Meal_Planner").collection('meal_plan').replaceOne({ _id: userId }, mealPlan);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: 'An error occurred while updating the meal plan.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while updating the meal plan', error });
    }
  }
];

const deleteMealPlan = [
  param('id').isMongoId().withMessage('Invalid meal plan ID'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = new ObjectId(req.params.id);
    try {
      const response = await mongodb.getDb().db("Pets_Meal_Planner").collection('meal_plan').deleteOne({ _id: userId });
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: 'An error occurred while deleting the meal plan.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while deleting the meal plan', error });
    }
  }
];

module.exports = { getAllMealPlans, getSingleMealPlan, createMealPlan, updateMealPlan, deleteMealPlan };