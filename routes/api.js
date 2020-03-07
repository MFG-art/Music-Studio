const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/users", (req, res, next) => {
  console.log("Inside the get call");
  db.Users.find({})
    .then(data => {
      console.log(data);
      return res.json(data);
    })
    .catch(next);
});

router.post("/users", (req, res, next) => {
  console.log(req.body);
  if (req.body) {
    db.Users.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({ error: "The item field is empty" });
  }
});

router.delete("/users/:id", (req, res, next) => {
  db.Users.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

router.get("/projects", (req, res, next) => {
  console.log("Inside the get call");
  db.Projects.find({})
    .then(data => {
      console.log(data);
      return res.json(data);
    })
    .catch(next);
});

router.post("/projects", (req, res, next) => {
  console.log(req.body);
  if (req.body) {
    db.Projects.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({ error: "The item field is empty" });
  }
});

router.delete("/projects/:id", (req, res, next) => {
  db.Projects.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
