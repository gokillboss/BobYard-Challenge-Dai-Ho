const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    pool: dbConfig.pool,
    logging: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.comments = require('./commentModel')(sequelize, DataTypes);

module.exports = db;
