// On importe le package fs (file system) de Node
const fs = require("fs");
const { execFileSync } = require("child_process");

// On créé l'accès aux variable du .env
const dotenv = require("dotenv").config();
const secretToken = process.env.SECRET_TOKEN;

// Connexion à la base de données
const pool = require("../config/database");

// On importe le package de cryptage de mot de passe
const bcrypt = require("bcrypt");

// On importe le package jsonwebtoken qui va permettre de créer des tokens et de les vérifier
const jwt = require("jsonwebtoken");

// Middleware pour connecter des utilisateurs existants
exports.users = (req, res, next) => {
      // On cherche dans la base de données un utilisateur qui à la même adresse mail que celle envoyée dans la requête
      const user = "SELECT user.id, user.firstName, user.lastName, user.imageUrlUser, user.creationTimeUser FROM user"
  pool.query(user, (error, results) => {
      if (!results) {
            res.json({ status: "Not found!" });
      } else {
            res.json(results);
      }
});
};

exports.modifyUser = (req, res, next) => {
            const imageUrlUser = `SELECT user.imageUrlUser FROM user WHERE id = ${req.auth.userId}`

            pool.query(imageUrlUser, (error, results) => {
                if (results[0].imageUrlUser !== null) {
                      const filename = results[0].imageUrlUser.split("/imagesUser/")[1];
                       fs.unlink(`imagesUser/${filename}`, function (err) {
                                  if (err) throw err;
                                  // if no error, file has been deleted successfully
                                  console.log('File deleted!');
                              });
                }
          });

      const userProfilePicChange = {
            imageUrlUser: `${req.protocol}://${req.get("host")}/imagesUser/${req.file.filename}`,
      };

      const query = `UPDATE user SET imageUrlUser = ? WHERE id = ${req.auth.userId}`;

      pool.query(query, Object.values(userProfilePicChange), (error) => {
            if (error) {
                  res.json({ status: "Fail to modify profile picture", reason: error.code });
            } else {
                  res.json({ status: "Successfully modify profile picture", userProfilePicChange: userProfilePicChange });
            }
      })
}

// Middleware pour l'enregistrement de nouvels utilisateurs
exports.signup = (req, res, next) => {
      // On crypte le mot de passe. On exécute 10 fois l'algorithme de hashage.
      bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                  const userData = {
                        id: req.body.id,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        imageUrl: req.body.imageUrl,
                        creationTime: req.body.creationTime,
                        roleId: req.body.roleId,
                  };
                  console.log(userData);

                  const query = "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, now(), default)";

                  pool.query(query, Object.values(userData), (error) => {
                        if (error) {
                              res.status(400).json({ status: "Fail to create user", reason: error.code, reason2: error });
                        } else {
                              res.status(201).json({ status: "User successfully created", userData: userData });
                        }
                  });
            })
            .catch((error) => res.status(500).json({ error }));
};

// Middleware pour connecter des utilisateurs existants
exports.login = (req, res, next) => {
      // On cherche dans la base de données un utilisateur qui à la même adresse mail que celle envoyée dans la requête
      const user = `SELECT * FROM user WHERE email = "${req.body.email}"`;
      pool.query(user, (error, results) => {
            if (!results.length) {
                  return res.status(404).json({ error: "Utilisateur non trouvé !" });
            } else {
                  bcrypt.compare(req.body.password, results[0].password)
                        .then((valid) => {
                              // Si l'utilisateur entre le mauvais mot de passe
                              if (!valid) {
                                    console.log(results);
                                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                              } else {
                                    // Si l'utilisateur entre le bon mot de passe
                                    res.status(200).json({
                                          userId: results[0].id,
                                          roleId: results[0].roleId,
                                          
                                          // On encode le userId pour que seul l'utilisateur qui a entré une sauce puisse la modifier ou supprimer
                                          token: jwt.sign({ userId: results[0].id }, secretToken, { expiresIn: "24h" }),
                                    });
                              }
                        })
                        .catch((error) => res.status(500).json({ error }));
            }
      });
};
