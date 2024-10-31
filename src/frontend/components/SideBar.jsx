import { useState, useEffect } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import LogoWebsite from "../../assets/logo-color.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchFilesAndGenerateLinks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Aucun token disponible, utilisateur non authentifié.");
          return;
        }

        // Étape 1 : Récupérer la liste des fichiers de l'utilisateur
        const response = await axios.get("http://localhost:3000/api/files/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedFiles = response.data.files;

        // Étape 2 : Générer les liens de partage si nécessaire
        await Promise.all(
          fetchedFiles.map(async (file) => {
            if (!file.shareLink) {
              try {
                await axios.post(
                  `http://localhost:3000/api/files/share/${file.id}`,
                  {
                    expirationInHours: 24, // Ajouter la durée d'expiration dans le corps de la requête
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              } catch (error) {
                console.error(
                  `Erreur lors de la génération du lien de partage pour le fichier ${file.id}`,
                  error
                );
              }
            }
          })
        );

        // Étape 3 : Récupérer à nouveau les fichiers avec les liens mis à jour
        const updatedResponse = await axios.get("http://localhost:3000/api/files/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFiles(updatedResponse.data.files);
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers", error);
      }
    };

    if (isOpen) {
      fetchFilesAndGenerateLinks(); // Récupérer les fichiers et générer les liens lorsque la sidebar s'ouvre
    }
  }, [isOpen]);

  return (
    <div className="flex">
      <button onClick={toggleSidebar} className="p-2">
        <img src={LogoWebsite} alt="Logo du site" className="size-16" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "500px" }}
      >
        <div className="p-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Mes Fichiers</h2>
            <RxCross2
              className="bg-white w-6 h-6 rounded-full text-black cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <ul className="mt-4">
            {files.length > 0 ? (
              files.map((file) => (
                <li key={file.id} className="mb-2">
                  <div className="p-4 border border-gray-500 rounded-xl bg-white text-black flex flex-col gap-3">
                    <h1 className="text-2xl">{file.filename}</h1>
                    <p className="text-sm text-gray-600">
                      Taille : {file.size} octets
                    </p>
                    <p className="text-sm text-gray-600">
                      Date de création :{" "}
                      {file.uploadedAt}
                    </p>
                    {file.shareLink ? (
                      <a
                        href={`http://localhost:3000/api/files/share/${file.shareLink}`}
                        className="text-blue-600 text-sm border-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lien de téléchargement
                      </a>
                    ) : (
                      <p className="text-sm text-gray-400">
                        Lien de partage indisponible
                      </p>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-400">Aucun fichier disponible</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
