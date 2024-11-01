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
  
      if (file.userId !== req.user.userId) {
        return res.status(403).json({ message: 'Accès non autorisé' });
      }
  
      const shareToken = uuidv4();
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + expirationInHours);
  
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

export const accessSharedFile = async (req, res) => {
  const { shareToken } = req.params;
  try {
    const file = await File.findOne({ where: { shareToken } });
    if (!file) {
      return res.status(404).json({ message: 'Lien de partage invalide ou fichier introuvable' });
    }

    if (new Date() > file.expirationDate) {
      return res.status(410).json({ message: 'Le lien de partage a expiré' });
    }

    const filename = file.filename.includes('.') ? file.filename : `${file.filename}.${file.extension || 'bin'}`;

    res.setHeader('Content-Type', file.mimeType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    res.send(file.data);
  } catch (error) {
    console.error('Erreur lors de l\'accès au fichier partagé :', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

export const deleteFile = async (req, res) => {
    const { fileId } = req.params;
  
    try {
      const file = await File.findByPk(fileId);
      if (!file) {
        return res.status(404).json({ message: 'Fichier introuvable' });
      }
  
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