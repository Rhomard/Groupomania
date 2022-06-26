// On créé l'accès aux variable du .env
require("dotenv").config();
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// On importe le package de cryptage de mot de passe
const bcrypt = require("bcrypt");

// Connexion à la base de données
const mysql = require("mysql");


let creationPool = mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
    });
      
    creationPool.connect(function(err) {
      if (err) throw err;
      console.log("Connected to database");

      creationPool.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, function (err, result) {
        if (err) throw err;
        console.log(`Database initialized`)

        bcrypt.hash('mdp', 10).then((hash) => {
        creationPool.query(`USE ${dbName}`)

        creationPool.query("CREATE TABLE IF NOT EXISTS `role` (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, role VARCHAR(30) NOT NULL UNIQUE)")

        creationPool.query("CREATE TABLE IF NOT EXISTS `user` (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(30) NOT NULL, lastName VARCHAR(30) NOT NULL, email VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, imageUrlUser VARCHAR(100), creationTimeUser DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, roleId INT NOT NULL DEFAULT(2), FOREIGN KEY (roleId) REFERENCES role (id))")

        creationPool.query("CREATE TABLE IF NOT EXISTS `post` (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, userId INT NOT NULL, FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE, title VARCHAR(100) NOT NULL, description VARCHAR(200) NOT NULL, imageUrlPost VARCHAR(100), creationTimePost DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, modificationTimePost DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)")

        creationPool.query("CREATE TABLE IF NOT EXISTS `postLike` (userId INT NOT NULL, FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE, postId INTEGER NOT NULL, FOREIGN KEY (postId) REFERENCES post (id) ON DELETE CASCADE)")

        creationPool.query("INSERT IGNORE INTO `role` (role) VALUES ('admin'), ('visitor')")

        creationPool.query(`INSERT IGNORE INTO user (firstName, lastName, email, password) VALUES ('SUPER', 'ADMIN', 'admin@gmail.com', '${hash}')`)
       
        creationPool.query("UPDATE `user` SET roleId = '1' WHERE id = 1")
      })
      
      });
    }); 

    let pool = mysql.createPool({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      database: dbName,
    });
   
  
  module.exports = pool; 