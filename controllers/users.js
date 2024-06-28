const mongodb = require('../db/connect');

const getAllUsers = async (req, res) => {
  const result = await mongodb.getDb().db('Pets_Meal_Planner').collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  const response = await mongodb.getDb().db().collection().insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating the user');
  }
};
module.exports = { getAllUsers, createUser };
