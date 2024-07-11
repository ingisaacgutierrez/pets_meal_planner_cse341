const routes = require('express').Router();
const petController = require('../controllers/pets');
const validation = require('../validator.js');


routes.get('/all-pets', petController.getAllPets);

routes.get(`/:id`, petController.getPetById);

routes.post('/create', validation.petsValidate, petController.createPet);

routes.put(`/update/:id`, validation.petsValidate, petController.updatePet);

routes.delete(`/delete/:id`, petController.deletePet);

module.exports = routes;
