Pons_P7_Backend

Ce projet est prévu pour tourner avec nodeJs et une base de données mysql. Afin de le faire fonctionner, il necessite la présence de variable d'environnement.

Vous devez donc créer un fichier .env avec ces informations :

cryptKey=<String>

nameDb=Groupomania

userDb=<NomUtilisateurBDD>

passwordDb=<MotDePasseBDD>

tokenKey=<String>

hmacKey=<String>

vous devez egalement un dossier "images" dans le projet

Au premier lancement, vous devez executer la commande "npm install".

La commande "npm start" permet de lancer le projet avec les variables d'envirronnement
.
