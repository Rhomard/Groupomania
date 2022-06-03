// Connexion à la base de données
const pool = require("../config/database");

console.log("postController connected with the database");

exports.getAllPost = (req, res, next) => {
      const query = "SELECT * FROM post ORDER BY creationTime DESC";
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
            }
      });
};

exports.createPost = (req, res, next) => {
      const postData = {
            id: req.body.id,
            userId: req.auth.userId,
            title: req.body.title,
            description: req.body.description,
            imageURL: req.body.imageUrl,
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
};

exports.modifyPost = (req, res, next) => {
      const postDataChange = {
            title: req.body.title,
            description: req.body.description,
            imageURL: req.body.imageUrl,
            modificationTime: req.body.modificationTime,
      };

      const query = `UPDATE post SET title = ?, description = ?, imageUrl = ?, modificationTime = now() WHERE id = ${req.params.id}`;

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

      pool.query(query, (error) => {
            if (error) {
                  res.json({ status: "Fail to delete", reason: error.code });
            } else {
                  res.json({ status: "Successfully deleted", data: req.params.title });
            }
      });
};
