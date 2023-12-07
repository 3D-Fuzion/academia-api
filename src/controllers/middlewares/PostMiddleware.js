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
  const { params } = req;

  if (!params.postid) {
    return res.status(400).json({ message: "POST_ID is required!" });
  }

  next();
}

const validateLikePublication = async (req, res, next) => {
  const { body } = req;

  if (!body.postid) {
    return res.status(400).json({ message: "POST_ID is required!" });
  }

  if (!body.userid) {
    return res.status(400).json({ message: "USER_ID is required!" });
  }

  next();
}

const validateStarPublication = async (req, res, next) => {
  const { body } = req;

  if (!body.postid) {
    return res.status(400).json({ message: "POST_ID is required!" });
  }

  if (!body.userid) {
    return res.status(400).json({ message: "USER_ID is required!" });
  }

  next();
}

module.exports = {
  validadeMakePost,
  validadeDeletePost,
  getPostById,
  validateLikePublication,
  validateStarPublication
}