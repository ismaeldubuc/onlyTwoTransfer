import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes (ajoutez vos routes ici)
app.use(express.json()); // Pour analyser le corps des requêtes en JSON
app.use('/api', userRoutes); // Monter les routes utilisateurs sous le préfixe /api

// Vérification que l'application fonctionne
app.get('/', (req, res) => {
    res.send('Bienvenue sur OnlyTwoTransfer!');
});

export default app;