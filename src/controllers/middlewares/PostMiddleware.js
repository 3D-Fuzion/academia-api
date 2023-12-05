const validadeMakePost = async (req, res, next) => {
  const { body } = req;

  if (!body.userid || body.userid === " ") {
    return res.status(400).json({ message: "USERID is required!" });
  }

  if (!body.image) {
    return res.status(400).json({ message: "IMAGE is required!" });
  }

  if (!body.title) {
    return res.status(400).json({ message: "TITLE is required!" });
  }

  next();
}

const validadeDeletePost = async (req, res, next) => {
  const { body } = req;

  if (!body.postid) {
    return res.status(400).json({ message: "POST_ID is required!" });
  }

  next();
}

const getPostById = async (req, res, next) => {
  const { body } = req;

  if (!body.postid) {
    return res.status(400).json({ message: "POST_ID is required!" });
  }

  next();
}

module.exports = {
  validadeMakePost,
  validadeDeletePost,
  getPostById
}