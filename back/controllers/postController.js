// Connexion à la base de données
const pool = require("../config/database");

console.log("Connected with the database");

exports.getAllPost = (req, res, next) => {
      const query = "SELECT * FROM post";
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
      const data = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
      };

      const query = "INSERT INTO post VALUES (?, ?, ?)";

      pool.query(query, Object.values(data), (error) => {
            if (error) {
                  res.json({ status: "Fail to create", reason: error.code });
            } else {
                  res.json({ status: "Successfully created", data: data });
            }
      });
};

exports.modifyPost = (req, res, next) => {
      const dataChange = {
            title: req.body.title,
            description: req.body.description,
      };

      const query = `UPDATE post SET title = ?, description = ? WHERE id = ${req.params.id}`;

      pool.query(query, Object.values(dataChange), (error) => {
            if (error) {
                  res.json({ status: "Fail to modify", reason: error.code });
            } else {
                  res.json({ status: "Successfully modify", data: dataChange });
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
