var express = require("express");
var router = express.Router();
const os = require("os");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    hostname: os.hostname(),
    type: os.type(),
    platform: os.platform(),
  });
});
router.get("/cpus", function (req, res, next) {
  res.status(200).json(os.cpus());
});
router.get("/cpus/:id", function (req, res, next) {
  const { id } = req.params;
  id < 0 && res.status(401).json({ message: "you must give a positive id" });
  const cpus = os.cpus();
  res.status(200).json(cpus[id]);
});

module.exports = router;
