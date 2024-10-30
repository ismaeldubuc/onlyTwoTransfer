// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Chemin corrigé vers src/config/db

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usedQuota: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Espace utilisé en Mo
  },
});

module.exports = User;
