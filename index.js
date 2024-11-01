import app from './src/app.js';
import sequelize from './src/config/db.js';
import User from './src/models/User.js';
import File from './src/models/File.js';

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true })
  .then(() => {
    console.log('Base de données synchronisée.');
  })
  .catch((err) => {
    console.error('Erreur de synchronisation :', err);
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});