# Fil Rouge

## Description
Ce projet est une application web composée d'un frontend et d'un backend.

## Structure du Projet
- `frontend/` : Application côté client
- `backend/` : Serveur et API

## Installation

### Structure du projet
-------------------
FIL-ROUGE/
│
├── BACKEND/
│   └── Auth/            # Application Laravel 12 (API REST)
│
├── FRONTEND/            # Application React JS (Vite)

### Prérequis
---------
- PHP >= 8.1
- Composer
- Node.js >= 18.x
- Git
- MySQL ou autre SGBD compatible
- Laravel CLI
- Vite

### Cloner le projet
   git clone https://github.com/ton-utilisateur/FIL-ROUGE.git
   cd FIL-ROUGE


### Installation des dépendances

1. Frontend :
```bash
 cd ../../FRONTEND
   npm install
   npm run dev

   => Frontend disponible sur http://localhost:5173
```

2. Backend :
```bash
Configuration du backend (Laravel)
   cd BACKEND/Auth
   cp .env.example .env
   composer install
   php artisan key:generate

   # Modifier le fichier .env avec vos identifiants MySQL

   php artisan migrate
   php artisan serve

   => API disponible sur http://127.0.0.1:8000
```

## Démarrage

1. Démarrer le backend :
```bash
cd backend
npm start
```

2. Démarrer le frontend :
```bash
cd frontend
npm start
```
### Lien entre frontend et backend
------------------------------
Dans le frontend, assurez-vous que les appels API pointent vers l’URL backend (http://127.0.0.1:8000/api/...) dans le fichier de configuration ou via des variables d’environnement.

Fonctionnalités clés
--------------------
- Authentification freelance/client
- Publication et recherche de projets
- Propositions et gestion de missions
- Tableau de bord utilisateur
- Système de notation
- Paiement sécurisé (à venir)

À venir
-------
- Version mobile responsive
- Chat en temps réel
- Système de certification de profils

Auteurs
-------
Projet réalisé dans le cadre d'une formation en développement web fullstack.


## Contribution
Pour contribuer au projet :
1. Créez une branche (`git checkout -b feature/AmazingFeature`)
2. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
3. Poussez vers la branche (`git push origin feature/AmazingFeature`)
4. Ouvrez une Pull Request

## License
Ce projet est sous licence MIT.