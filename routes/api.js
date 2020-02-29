const express = require("express");
const router = express.Router();
const Users = require("../models/users");

router.get("/users", (req, res, next) => {
  Users.find({})
    .then(data => res.json(data))
    .catch(next);
});

router.post("/users", (req, res, next) => {
  console.log(req.body);
  if (req.body) {
    Users.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({ error: "The item field is empty" });
  }
});

router.delete("/users/:id", (req, res, next) => {
  Users.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
