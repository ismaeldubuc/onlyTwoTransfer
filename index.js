// index.js
const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const User = require('./src/models/User');
const File = require('./src/models/File');
const sequelize = require('./src/config/db');

sequelize.sync({ force: true }) // En développement, force:true réinitialise les tables
  .then(() => {
    console.log('Base de données synchronisée.');
  })
  .catch((err) => {
    console.error('Erreur de synchronisation :', err);
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
