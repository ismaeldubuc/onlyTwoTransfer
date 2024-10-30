// src/models/File.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Chemin corrigé vers src/config/db
const User = require('./User');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER, // Taille en Mo
    allowNull: false,
  },
  expirationDate: {
    type: DataTypes.DATE, // Date d'expiration du lien
    allowNull: true,
  },
});

// Association entre les tables User et File
File.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(File, { foreignKey: 'userId' });

module.exports = File;
