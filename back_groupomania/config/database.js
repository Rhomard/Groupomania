// On créé l'accès aux variable du .env
const dotenv = require("dotenv").config();
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

// Connexion à la base de données
const mysql = require("mysql");

const pool = mysql.createPool({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      database: dbDatabase,
});

// const pool = mysql.createPool({
//       host: dbHost,
//       user: dbUser,
//       password: dbPassword,
//       port: 3000,
//       database: dbDatabase
//     });
      
//     pool.getConnection(function(err) {
//       if (err) throw err;
//       console.log("Connected!");
//       pool.query(`CREATE DATABASE IF NOT EXISTS ${dbDatabase}`, function (err, result) {
//         if (err) throw err;
//         console.log(`Database initialized !`)

//         pool.query(`USE ${dbDatabase}`)

//         pool.query("CREATE TABLE IF NOT EXISTS `role` (`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,role VARCHAR(30) NOT NULL)")
  
//         pool = mysql.createPool({
//             host: dbHost,
//             user: dbUser,
//             password: dbPassword,
//             port: 3000,
//             database: dbDatabase,
//         });
//       });
//     }); 
   
  
  module.exports = pool; 