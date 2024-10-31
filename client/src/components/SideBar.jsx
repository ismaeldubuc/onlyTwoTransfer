import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import LogoWebsite from "../assets/logo-color.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Logo ou icône pour déclencher l'ouverture/fermeture de la sidebar */}
      <button onClick={toggleSidebar} className="p-2">
        <img src={LogoWebsite} alt="" className="size-16" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800  text-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "500px" }}
      >
        <div className="p-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Sidebar</h2>
            <RxCross2
              className="bg-white w-6 h-6 rounded-full text-black"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <ul className="mt-4">
            <li className="mb-2">
              <div className="p-4 border border-gray-500 rounded-xl bg-white text-black flex flex-col gap-3">
                <h1 className="text-2xl">Nom du Fichier</h1>
                <p className="text-sm text-gray-600">Taille</p>
                <p className="text-sm text-gray-600">Date de création</p>
                <a
                  href="https://tenor.com/fr/view/rickroll-roll-rick-never-gonna-give-you-up-never-gonna-gif-22954713"
                  className="text-blue-600 text-sm border-blue-600"
                >
                  https://tenor.com/fr/view/rickroll-roll-rick-never-gonna-give-you-up-never-gonna-gif-22954713
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
