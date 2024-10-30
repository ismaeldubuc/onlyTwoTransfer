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

File.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(File, { foreignKey: 'userId' });

export default File;