const routes = require('express').Router();
const recipeContoller = require('../controllers/recipes');
const validation = require('../validator.js');

routes.get('/all-recipes', recipeContoller.getAllRecipes);

routes.get(`/recipe/:id`, recipeContoller.getSingleRecipe);

routes.post('/create/recipe', validation.recipeValidate, recipeContoller.createRecipe);

routes.put(`/update/recipe/:id`, validation.recipeValidate, recipeContoller.updateRecipe);

routes.delete(`/delete/recipe/:id`, recipeContoller.deleteRecipe);

module.exports = routes;
