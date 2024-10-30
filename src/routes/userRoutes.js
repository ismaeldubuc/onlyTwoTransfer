import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// Route pour l'inscription (sans /api)
router.post('/register', registerUser);

// Route pour la connexion (sans /api)
router.post('/login', loginUser);

export default router;
