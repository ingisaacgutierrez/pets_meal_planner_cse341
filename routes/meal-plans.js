const routes = require('express').Router();
const mealPlanController = require('../controllers/meal-plans');
const validation = require('../validator.js');

routes.get('/all-meal-plans', mealPlanController.getAllMealPlans);

routes.get('/meal-plan/:id', mealPlanController.getSingleMealPlan);

routes.post('/create/meal-plan', validation.mealPlanValidate, mealPlanController.createMealPlan);

routes.put('/update/meal-plan/:id', validation.mealPlanValidate, mealPlanController.updateMealPlan);

routes.delete('/delete/meal-plan/:id', mealPlanController.deleteMealPlan);

module.exports = routes;