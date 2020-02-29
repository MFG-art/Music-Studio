const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.sendFile("../public/music-studio.html");
});

module.exports = router;
