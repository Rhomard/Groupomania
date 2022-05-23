const mysql = require("mysql");

const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "mdpdatabase",
      database: "groupomania",
});

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

exports.createPost = (req, res, next) => {
      const data = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
      };

      const query = "INSERT INTO post VALUES (?, ?, ?)";

      pool.query(query, Object.values(data), (error) => {
            if (error) {
                  res.json({ status: "Failure", reason: error.code, MyBody: req.body });
            } else {
                  res.json({ status: "Success", data: data });
            }
      });
};
