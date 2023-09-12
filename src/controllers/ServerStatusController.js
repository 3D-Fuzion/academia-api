function serverStatus(req, res) {
  res.status(200).json({ message: "Server Online" });
}

module.exports = {
  serverStatus,
};
