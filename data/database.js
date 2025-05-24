const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient

let database

const initDb = async (callback) => {
  if (database) {
    console.log('Db is already initialised');
    return callback(null, database)
  }

  try {
      const client = await MongoClient.connect(process.env.MONGODB_URI)

    database = client
    callback(null, database)
  } catch (err) {
    callback(err)
  }
}

const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialised')
  }
  return database
}

module.exports = {
  initDb,
  getDatabase
}
