// On importe le package fs (file system) de Node
const fs = require("fs");
const { execFileSync } = require("child_process");

// Connexion à la base de données
const pool = require("../config/database");
const { log } = require("console");

console.log("postController connected with the database");

exports.getAllPost = (req, res, next) => {
      const query = "SELECT post.*, user.firstName, user.lastName, user.imageUrlUser FROM post, user WHERE post.userId = user.id ORDER BY post.creationTimePost DESC";
      pool.query(query, (error, results) => {
            if (!results) {
                  res.json({ status: "Not found!" });
            } else {
                  res.json(results);
            }
      });
};

exports.getOnePost = (req, res, next) => {
      const query = `SELECT * FROM post where id = ${req.params.id} `;
      pool.query(query, (error, results) => {
            if (!results) {
                  res.json({ status: "Not found!" });
            } else {
                  res.json(results);
                  console.log(results);
            }
      });
};

exports.createPost = (req, res, next) => {

      if (req.file){
      const postData = {
            id: req.body.id,
            userId: req.auth.userId,
            title: req.body.title,
            description: req.body.description,
            imageUrlPost: `${req.protocol}://${req.get("host")}/imagesPost/${req.file.filename}`,
            creationTime: req.body.creationTime,
            modificationTime: req.body.modificationTime,
      };


      const query = `INSERT INTO post VALUES (?, ?, ?, ?, ?, now(), now())`;

      pool.query(query, Object.values(postData), (error) => {
            if (error) {
                  res.json({ status: "Failed to create post", reason: error.code, reason2: error });
            } else {
                  res.json({ status: "Post successfully created", postData: postData });
            }
      });}
      else{
            const postData = {
                  id: req.body.id,
                  userId: req.auth.userId,
                  title: req.body.title,
                  description: req.body.description,
                  imageUrlPost: req.body.imageUrlPost,
                  creationTime: req.body.creationTime,
                  modificationTime: req.body.modificationTime,
            };
      
      
            const query = `INSERT INTO post VALUES (?, ?, ?, ?, ?, now(), now())`;
      
            pool.query(query, Object.values(postData), (error) => {
                  if (error) {
                        res.json({ status: "Failed to create post", reason: error.code, reason2: error });
                  } else {
                        res.json({ status: "Post successfully created", postData: postData });
                  }
            });

      }
};

exports.modifyPost = (req, res, next) => {
      const postDataChange = {
            title: req.body.title,
            description: req.body.description,
            imageUrlPost: req.body.imageUrlPost,
            modificationTimePost: req.body.modificationTimePost,
      };

      const query = `UPDATE post SET title = ?, description = ?, imageUrlPost = ?, modificationTimePost = now() WHERE id = ${req.params.id}`;

      pool.query(query, Object.values(postDataChange), (error) => {
            if (error) {
                  res.json({ status: "Fail to modify", reason: error.code });
            } else {
                  res.json({ status: "Successfully modify", postDataChange: postDataChange });
            }
      });
};

exports.deletePost = (req, res, next) => {
      const query = `DELETE FROM post WHERE id = ${req.params.id}`;

      const imageUrlPost = `SELECT post.imageUrlPost FROM post WHERE id = ${req.params.id}`

      const filename = imageUrlPost.split("/imagesPost/")[1];

      fs.unlink(`imagesPost/${filename}`, () => {})

      pool.query(query, (error) => {
            if (error) {
                  res.json({ status: "Fail to delete", reason: error.code });
            } else {
                  res.json({ status: "Successfully deleted", data: req.params.title });
            }
      });
};
