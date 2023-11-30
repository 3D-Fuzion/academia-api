const connection = require("../../database")

const validadeMakePost = async (req, res, next) => {
  const { body } = req;

  if (!body.userid) {
    res.status(400).json({ message: "USERID is required!" });
  }

  if (!body.image) {
    res.status(400).json({ message: "IMAGE is required!" });
  }

  next();
}


module.exports = {
  validadeMakePost,
}