const connection = require("../../database")

async function setRecord(req, res) {
  const { body } = req;

  const [rows] = await connection.query("SELECT id FROM `record` WHERE userId = ? AND trainingId = ? LIMIT 1",[
    body.userid, body.trainingid
  ]); 

  if (rows.length > 0){
    const recordId = rows[0].id 

    const [changedExercice] = await connection.query("UPDATE `record` SET weight = ? WHERE id= ?", [
      body.weight,
      recordId,
    ]);

    if(changedExercice.affectedRows > 0){ 
      res.status(200).end();
    }
  } 

  if (rows.length < 1){
    const [firstRecord] = await connection.query("INSERT INTO `record` (userId, trainingId, weight) VALUES (?,?,?)", [
      body.userid, 
      body.trainingid,
      body.weight 
    ]); 

    if(firstRecord.affectedRows > 0){ 
      res.status(200).end();
    }
  } 

  res.status(200).end();
}

async function getTrainings (req, res) { 
  const category = req.query.category
  const userId = req.query.userid

  if(!category) { 
    const [trainings] = await connection.query("SELECT SQL_SMALL_RESULT * FROM `training`"); 
    res.status(200).json(trainings);
  } 

  if(!userId) { 
    res.status(404).json({message: "USERID is required"});
  }

  const [trainings] = await connection.query("SELECT weight, id, name FROM training t LEFT JOIN ( SELECT r.userId, r.trainingId, r.weight FROM record r WHERE r.userid = ? ) r ON t.id = r.trainingId WHERE t.category = ?", [
    userId,
    category
  ]); 

  if (trainings.length < 1) { 
    res.status(404).json({message: "Not exist trainings with given category"});
  }

  res.status(200).json(trainings);
}

module.exports = {
  setRecord,
  getTrainings,
};
