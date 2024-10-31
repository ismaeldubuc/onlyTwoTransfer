import File from '../models/File.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const upload = multer();

export const uploadFile = async (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      console.error('Erreur lors de l\'upload du fichier :', err);
      return res.status(500).json({ message: 'Erreur lors de l\'upload', error: err.message });
    }

    const { originalname, buffer, size } = req.file;
    try {
      const newFile = await File.create({
        filename: originalname,
        data: buffer,
        size: size,
        userId: req.user.userId,
      });

      res.status(201).json({ message: 'Fichier uploadé avec succès', fileId: newFile.id });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du fichier :', error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  });
};

export const generateShareLink = async (req, res) => {
    const { fileId } = req.params;
    const { expirationInHours } = req.body; // Durée en heures pendant laquelle le lien est valide
  
    try {
      const file = await File.findByPk(fileId);
      if (!file) {
        return res.status(404).json({ message: 'Fichier introuvable' });
      }
  
      // Vérifier que l'utilisateur est propriétaire du fichier
      if (file.userId !== req.user.userId) {
        return res.status(403).json({ message: 'Accès non autorisé' });
      }
  
      // Générer un jeton de partage unique
      const shareToken = uuidv4();
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + expirationInHours);
  
      // Mettre à jour le fichier avec le jeton et la date d'expiration
      file.shareToken = shareToken;
      file.expirationDate = expirationDate;
      await file.save();
  
      const shareLink = `${req.protocol}://${req.get('host')}/api/files/share/${shareToken}`;
      res.status(200).json({ message: 'Lien de partage généré avec succès', shareLink });
    } catch (error) {
      console.error('Erreur lors de la génération du lien de partage :', error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

import mime from 'mime-types'; // Add this package to your dependencies if not already installed

export const accessSharedFile = async (req, res) => {
  try {
    const { shareToken } = req.params;

    const file = await File.findOne({ where: { shareToken } });

    if (!file) {
      return res.status(404).json({ message: 'Fichier non trouvé.' });
    }

    // Suppression des headers potentiellement problématiques
    return res.send(file.data); // Envoyer les données binaires du fichier
  } catch (error) {
    console.error('Erreur lors de l\'accès au fichier partagé :', error);
    return res.status(500).json({ message: 'Erreur lors de l\'accès au fichier partagé.' });
  }
};



export const deleteFile = async (req, res) => {
    const { fileId } = req.params;
  
    try {
      const file = await File.findByPk(fileId);
      if (!file) {
        return res.status(404).json({ message: 'Fichier introuvable' });
      }
  
      // Vérifier que l'utilisateur est propriétaire du fichier
      if (file.userId !== req.user.userId) {
        return res.status(403).json({ message: 'Accès non autorisé' });
      }
  
      await file.destroy();
      res.status(200).json({ message: 'Fichier supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier :', error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
  
export const getUserFiles = async (req, res) => {
    try {
        const files = await File.findAll({
        where: { userId: req.user.userId },
        });

        const filesWithLinks = files.map(file => ({
        id: file.id,
        filename: file.filename,
        size: file.size,
        uploadedAt: file.createdAt,
        shareLink: file.shareToken,
        }));

        res.status(200).json({ files: filesWithLinks });
    } catch (error) {
        console.error('Erreur lors de la récupération des fichiers :', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};