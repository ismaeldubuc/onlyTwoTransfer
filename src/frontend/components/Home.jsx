import { useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import { CiCirclePlus } from "react-icons/ci";
import confetti from "canvas-confetti";

export const Home = () => {
  const [file, setFile] = useState(null);

  // Fonction appelée lorsque l'utilisateur choisit un fichier
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      try {
        const token = localStorage.getItem('token'); // Récupérer le token JWT
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Envoyer le fichier au backend via la route d'upload
        const response = await axios.post('http://localhost:3000/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // Ajouter le jeton pour l'authentification
          },
        });

        console.log('Fichier uploadé avec succès', response.data);
        
        // Afficher une alerte pour informer l'utilisateur
        alert('Fichier uploadé avec succès. Cliquez sur le logo pour accéder à la liste de vos fichiers.');
      } catch (error) {
        console.error("Erreur lors de l'upload du fichier", error);
      }
    }
  };

  // Fonction pour lancer l'animation de confettis
  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  return (
    <div>
      <Header />
      <div className="flex mt-80 justify-center align-middle items-center">
        <label className="cursor-pointer">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <CiCirclePlus
            className="text-9xl text-gray-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-165"
            onMouseEnter={launchConfetti}
          />
        </label>
      </div>
    </div>
  );
};
