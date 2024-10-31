import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const handleSignup = async (username, password, navigate) => {
  try {
    // Inscription de l'utilisateur
    await axios.post('http://localhost:3000/api/register', {
      username,
      password,
    });
    console.log('Inscription réussie');

    // Connexion automatique de l'utilisateur après l'inscription
    const loginResponse = await axios.post('http://localhost:3000/api/login', {
      username,
      password,
    });

    // Stockage du token JWT dans le localStorage
    localStorage.setItem('token', loginResponse.data.token);
    console.log('Connexion réussie');

    // Redirection vers la page d'accueil
    navigate('/home');
  } catch (error) {
    console.error("Erreur lors de l'inscription ou de la connexion", error);
  }
};

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  const onSubmit = (e) => {
    e.preventDefault();
    handleSignup(username, password, navigate);
  };

  return (
    <div className="flex h-screen justify-center items-center align-middle">
      <div className="flex flex-col gap-16 p-20 border border-gray-500 shadow-2xl rounded-2xl">
        <h1 className="text-5xl text-center">Inscription</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-8">
            <label className="text-2xl">Nom d&apos;utilisateur</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              className="border border-gray-300 p-4 rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-8">
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
          <button type="submit" className="text-xl bg-green-400 p-4 rounded-xl text-white mt-4">
            S&apos;inscrire
          </button>
        </form>
      </div>
    </div>
  );
};
