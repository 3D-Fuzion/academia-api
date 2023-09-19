const validadeSetImageBody = async (req, res, next) => { 
  
  const body = req.body;

  if(!body.userid) { 
    return res.status(400).json({message: "USERID is required!"});
  }

  if(!body.image) { 
    return res.status(400).json({message: "EFFECT_PHRASE is required!"});
  }

  next(); 
}

module.exports = {
    validadeSetImageBody,
}