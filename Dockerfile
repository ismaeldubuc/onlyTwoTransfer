# Utiliser une image Node.js officielle
FROM node:18

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste des fichiers du projet
COPY . .

# Exposer le port de l’application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "src/app.js"]
