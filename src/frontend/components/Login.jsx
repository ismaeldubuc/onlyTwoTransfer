import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const handleLogin = async (username, password, navigate) => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      username,
      password,
    });
    localStorage.setItem('token', response.data.token);
    console.log('Connexion réussie');
    navigate('/home '); // Redirection vers la page d'accueil
  } catch (error) {
    console.error('Erreur de connexion', error);
  }
};

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password, navigate);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col gap-16 p-40 border border-gray-500 shadow-2xl rounded-2xl">
        <h1 className="text-5xl text-center">Connexion</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="text-2xl">Nom d&apos;utilisateur</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nom_utilisateur"
              className="border border-gray-300 p-4 rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-2xl">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              className="border border-gray-300 p-4 rounded-xl"
            />
          </div>
          <button type="submit" className="text-xl bg-green-500 p-4 rounded-xl text-white mt-4">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};
