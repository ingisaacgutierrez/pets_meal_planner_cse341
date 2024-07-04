const routes = require('express').Router();
const petController = require('../controllers/pets');

routes.get('/all-pets', petController.getAllPets);

routes.get(`/:id`, petController.getPetById);

routes.post('/create', petController.createPet);

routes.put(`/update/:id`, petController.updatePet);

routes.delete(`/delete/:id`, petController.deletePet);

module.exports = routes;
