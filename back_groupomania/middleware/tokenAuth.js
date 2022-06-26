// On créé l'accès aux variable du .env
const dotenv = require("dotenv").config();
const secretToken = process.env.SECRET_TOKEN;

// Connexion à la base de données
const pool = require("../config/database");

// On importe le package jsonwebtoken qui va permettre de créer des tokens et de les vérifier
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

      const query = `SELECT * FROM post WHERE id = ${req.params.id} `;
      pool.query(query, (error, results) => {
            if (results) {
                  const token = req.headers.authorization.split(" ")[1];
                  // Décodage du token
                  const decodedToken = jwt.verify(token, secretToken);
                  // Récupération du userId encodé dans le token
                  const userId = decodedToken.userId;

                  // Comparaison du userId de la sauce et celui du token
                  if (results[0].userId && results[0].userId !== userId) {
                        const query = `SELECT * FROM user WHERE roleId = ${req.auth.userId}`;
                        pool.query(query, (error, results) => {
                              if (results[0].roleId == 1){
                                    next();
                              }
                              else {
                                    res.status(403).json({ message: "Unauthorized request !" });
                              }
                        })
                        
                  } else {
                        next();
                  }
            }


      });
      
};


   