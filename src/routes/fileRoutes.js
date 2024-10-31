import express from 'express';
import { uploadFile, accessSharedFile, generateShareLink } from '../controllers/fileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route pour l'upload de fichiers (protégée)
router.post('/upload', authMiddleware, uploadFile);

// Route pour générer un lien de partage (protégée)
router.post('/share/:fileId', authMiddleware, generateShareLink);

// Route publique pour accéder au fichier partagé
router.get('/share/:shareToken', accessSharedFile);

export default router;
