// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes (ajoutez vos routes ici)
// const fileRoutes = require('./routes/fileRoutes');
// app.use('/api/files', fileRoutes);

// Vérification que l'application fonctionne
app.get('/', (req, res) => {
    res.send('Bienvenue sur OnlyTwoTransfer!');
});

// Exportation de l'application
module.exports = app;
