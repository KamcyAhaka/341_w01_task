const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db('cse341').collection('users').find()

  result.toArray().then(users => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(users)
  })
}

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id)
  const result = await mongodb.getDatabase().db('cse341').collection('users').findOne({ _id: userId });
  res.status(200).json(result);
}

const createContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favouriteColor: req.body.favouriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb.getDatabase().db('cse341').collection('users').insertOne(contact);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user');
  }
};

const updateContact = async (req, res) => {
  // #swagger.tags=['Contacts']

  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favouriteColor: req.body.favouriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
    .getDatabase()
    db('cse341').collection('users')
    .replaceOne({ _id: contactId }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user');
  }
};

const deleteContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    db('cse341').collection('users')
    .deleteOne({ _id: contactId }, true);

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user');
  }
};

module.exports = {
  getAll, getSingle, createContact, updateContact, deleteContact 
}
