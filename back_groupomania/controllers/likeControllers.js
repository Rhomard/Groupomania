// Connexion à la base de données
const pool = require("../config/database");

console.log("likeController connected with the database");

exports.getLike = (req, res, next) => {
      const query = `SELECT * FROM postLike WHERE postLike.postId = ${req.params.id}`;
      pool.query(query, (error, results) => {
            if (!results) {
                  res.json({ status: "Not found!" });
            } else {
                  res.json(results);
            }
      });
};

exports.like = (req, res, next) => {
      const postLikeData = {
            userId: req.auth.userId,
            postId: req.body.postId,
      };

      const query = `INSERT INTO postLike VALUES (?, ?)`;

      pool.query(query, Object.values(postLikeData), (error) => {
            if (error) {
                  res.json({ status: "Failed to like post", reason: error.code, reason2: error });
            } else {
                  res.json({ status: "Post successfully liked", postLikeData: postLikeData });
            }
      });
};

exports.deleteLike = (req, res, next) => {
      const query = `DELETE FROM postLike WHERE userId = ${req.auth.userId} AND postId = ${req.params.id}`;

      pool.query(query, (error) => {
            if (error) {
                  res.json({ status: "Fail to delete", reason: error.code });
            } else {
                  res.json({ status: "Successfully deleted", data: req.params.id });
            }
      });
};