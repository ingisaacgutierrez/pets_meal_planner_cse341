const routes = require('express').Router();
const mealPlanController = require('../controllers/meal-plans')

routes.get('/all-meal-plans', mealPlanController.getAllMealPlans);

routes.get(`/meal-plan/:id`, mealPlanController.getSingleMealPlan);

routes.post('/create/meal-plan', mealPlanController.createMealPlan);

routes.put(`/update/meal-plan/:id`, mealPlanController.updateMealPlan);

routes.delete(`/delete/meal-plan/:id`, mealPlanController.deleteMealPlan);

module.exports = routes;