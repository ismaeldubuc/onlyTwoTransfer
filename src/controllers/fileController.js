import File from '../models/File.js';
import multer from 'multer';

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
