import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

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
  data: {
    type: DataTypes.BLOB('long'), // Type BLOB pour les données binaires des fichiers
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

File.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(File, { foreignKey: 'userId' });

export default File;
