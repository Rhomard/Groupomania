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
                  res.status(404).json({ status: "Not found!" });
            } else {
                  res.json(results);
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
                  res.json({ status: "Failed to create post", reason: error.code });
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
                        res.json({ status: "Failed to create post", reason: error.code });
                  } else {
                        res.json({ status: "Post successfully created", postData: postData });
                  }
            });

      }
};

exports.modifyPost = (req, res, next) => {
      if (req.file){
            const imageUrlPost = `SELECT post.imageUrlPost FROM post WHERE id = ${req.params.id}`

            pool.query(imageUrlPost, (error, results) => {
                if (results[0].imageUrlPost !== 'undefined') {
                      const filename = results[0].imageUrlPost.split("/imagesPost/")[1];
                       fs.unlink(`imagesPost/${filename}`, function (err) {
                                  if (err) throw err;
                                  // if no error, file has been deleted successfully
                                  console.log('File deleted!');
                              });
                }
          });

      const postDataChange = {
            title: req.body.title,
            description: req.body.description,
            imageUrlPost: `${req.protocol}://${req.get("host")}/imagesPost/${req.file.filename}`,
            modificationTimePost: req.body.modificationTimePost,
      };

      const query = `UPDATE post SET title = ?, description = ?, imageUrlPost = ?, modificationTimePost = now() WHERE id = ${req.params.id}`;

      pool.query(query, Object.values(postDataChange), (error) => {
            if (error) {
                  res.json({ status: "Fail to modify", reason: error.code });
            } else {
                  res.json({ status: "Successfully modify", postDataChange: postDataChange });
            }
      })}
      else {
            const postDataChange = {
                  title: req.body.title,
                  description: req.body.description,
                  modificationTimePost: req.body.modificationTimePost,
            };
      
            const query = `UPDATE post SET title = ?, description = ?, modificationTimePost = now() WHERE id = ${req.params.id}`;
      
            pool.query(query, Object.values(postDataChange), (error) => {
                  if (error) {
                        res.json({ status: "Fail to modify", reason: error.code });
                  } else {
                        res.json({ status: "Successfully modify", postDataChange: postDataChange });
                  }
            })
      }
};

exports.deletePost = (req, res, next) => {

      const imageUrlPost = `SELECT post.imageUrlPost FROM post WHERE id = ${req.params.id}`

        pool.query(imageUrlPost, (error, results) => {
            if (results[0].imageUrlPost !== 'undefined') {
                  const filename = results[0].imageUrlPost.split("/imagesPost/")[1];
                   fs.unlink(`imagesPost/${filename}`, function (err) {
                              if (err) throw err;
                              // if no error, file has been deleted successfully
                              console.log('File deleted!');
                          });
            }
      });

      const query = `DELETE FROM post WHERE id = ${req.params.id}`;

      pool.query(query, (error) => {
            if (error) {
                  res.json({ status: "Fail to delete", reason: error.code });
            } else {
                  res.json({ status: "Successfully deleted", data: req.params.title });
            }
      });
};
