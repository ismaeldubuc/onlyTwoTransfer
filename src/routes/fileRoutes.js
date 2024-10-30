import express from 'express';
import { uploadFile } from '../controllers/fileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route pour l'upload de fichiers (protégée)
router.post('/upload', authMiddleware, uploadFile);

export default router;