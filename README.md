# Documentation du Projet OnlyTwoTransfer

Merci de prendre en compte que nous étions un groupe de 2 pour réaliser ce projet.

## Description du Projet

OnlyTwoTransfer est une plateforme de partage de fichiers permettant aux utilisateurs de s'inscrire, se connecter, télécharger, partager et accéder à leurs fichiers via une interface conviviale. Ce projet inclut un backend basé sur Node.js avec Express, et un frontend développé avec React et Tailwind CSS. Les données sont stockées dans une base de données MySQL.

## Fonctionnalités

### Inscription et Connexion
- Les utilisateurs peuvent s'inscrire avec un nom d'utilisateur et un mot de passe.
- Après l'inscription, l'utilisateur est automatiquement connecté et redirigé vers la page d'accueil.
- Authentification JWT utilisée pour sécuriser les routes backend.

### Téléchargement de Fichiers
- Les utilisateurs peuvent sélectionner des fichiers depuis leur ordinateur et les télécharger via le frontend.
- Les fichiers sont sauvegardés sur le serveur avec les métadonnées appropriées (nom, taille, date d'upload).
- Après chaque téléchargement, une alerte indique à l'utilisateur qu'il peut accéder à la liste de ses fichiers en cliquant sur le logo de la Sidebar.

### Partage de Fichiers
- Les utilisateurs peuvent générer des liens de partage uniques pour leurs fichiers.
- Ces liens sont accessibles uniquement par les utilisateurs authentifiés et sont générés dynamiquement pour chaque fichier.

### Affichage des Fichiers
- Une Sidebar permet aux utilisateurs d'afficher la liste de leurs fichiers téléchargés.
- Chaque fichier est affiché avec son nom, sa taille, la date de création, ainsi qu'un lien de téléchargement.

### Suppression des Fichiers
- Les utilisateurs peuvent décider de supprimer leurs anciens fichiers pour libérer de la place de stockage dans leur espace.

## Architecture du Projet
- Backend : Node.js, Express, MySQL
- Frontend : React, Tailwind CSS
- Authentification : JWT

## Démarrer le Projet
1. Cloner le dépôt du projet.
2. À la racine du projet, exécuter la commande suivante pour démarrer les services Docker :
   ```
   docker-compose up --build
   ```
3. Le site sera ensuite disponible sur le localhost : [http://localhost:8080/](http://localhost:8080/)

## Problème Connu : Lien de Téléchargement

Dans la Sidebar du frontend, chaque fichier devrait avoir un lien de téléchargement associé. Toutefois, malgré les efforts pour récupérer et afficher ces liens dynamiquement, le champ `shareLink` ne s'affiche pas correctement. Lorsque l'utilisateur ouvre la Sidebar, une requête est envoyée pour récupérer tous les fichiers de l'utilisateur ainsi que leurs liens de partage. Les autres attributs, comme le nom et la taille du fichier, sont affichés correctement, mais le `shareLink` reste souvent indisponible.

### Note Importante
Lors des tests via Postman, toutes les routes fonctionnent parfaitement, y compris la génération des liens de partage. Le backend renvoie bien les liens de partage, et ceux-ci peuvent être utilisés pour télécharger les fichiers. Ce problème semble être lié à la logique du frontend qui ne gère pas correctement la récupération des liens ou au timing des `useEffect` dans React. Il peut nécessiter des ajustements pour garantir la synchronisation correcte entre les appels API.
