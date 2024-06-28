const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllPets = async (req, res) => {
  const result = await mongodb.getDb().db().collection('pet').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createPet = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const pet = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    species: req.body.species,
    owner: userId
  };
  const response = await mongodb.getDb().db().collection().insertOne(pet);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating the pet');
  }
};

module.exports = { getAllPets, createPet };
