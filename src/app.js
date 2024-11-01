import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/files', fileRoutes);
app.use(express.json()); 
app.use('/api', userRoutes); 

app.get('/', (req, res) => {
    res.send('Bienvenue sur OnlyTwoTransfer!');
});

export default app;