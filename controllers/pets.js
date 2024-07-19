const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllPets = async (req, res) => {
  const result = await mongodb.getDb().db('Pets_Meal_Planner').collection('pet').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getPetById = async (req, res) => {
  const petId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('Pets_Meal_Planner')
    .collection('pet')
    .find({ _id: petId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createPet = async (req, res) => {
  const pet = {
    name: req.body.name,
    species: req.body.species,
    breed: req.body.breed,
    age: req.body.age,
    owner: req.body.userId
  };
  const response = await mongodb.getDb().db('Pets_Meal_Planner').collection('pet').insertOne(pet);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating the pet');
  }
};

const updatePet = async (req, res) => {
  const petId = new ObjectId(req.params.id);
  const pet = {
    name: req.body.name,
    species: req.body.species,
    breed: req.body.breed,
    age: req.body.age
    // owner: userId
  };
  const response = await mongodb
    .getDb()
    .db('Pets_Meal_Planner')
    .collection('pet')
    .replaceOne({ _id: petId }, pet);
  if (response.acknowledged) {
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while updating the pet');
  }
};

const deletePet = async (req, res) => {
  const petId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('Pets_Meal_Planner')
    .collection('pet')
    .deleteOne({ _id: petId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the pet.');
  }
};

module.exports = { getAllPets, getPetById, createPet, updatePet, deletePet };
