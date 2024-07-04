const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  const result = await mongodb.getDb().db('Pets_Meal_Planner').collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getUserById = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('Pets_Meal_Planner')
      .collection('user')
      .findOne({ _id: userId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', err: error.message });
  }
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  const response = await mongodb.getDb().db('Pets_Meal_Planner').collection('user').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating the user');
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  const response = await mongodb
    .getDb()
    .db('Pets_Meal_Planner')
    .collection('user')
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the contact.');
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('Pets_Meal_Planner')
    .collection('user')
    .deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error eccurred while deletin the user.');
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
