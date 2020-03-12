const express = require("express");
const router = express.Router();
const db = require("../models");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/users", (req, res, next) => {
  console.log("Inside the get call");
  db.Users.find({})
    .then(data => {
      console.log(data);
      return res.json(data);
    })
    .catch(next);
});

router.post("/users", (req, res) => {
  console.log("Inside the users post call");

  if (req.body) {
    db.Users.create(req.body)
      .then(data => {
        return res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.json({ error: "The item field is empty" });
  }
});

router.post("/test", function(req, res) {
  console.log("--------This is the request-------------");
  //console.log("Req keys: ", Object.keys(req));
  console.log("===The request body:", req.body);

  var objectThing = { thing: 1 };

  return res.json(req.body);
});

router.post("/users/post", function(req, res) {
  console.log("--------This is the request body-------------");

  console.log(req.body);

  if (req.body) {
    db.Users.create(req.body)
      .then(data => {
        return res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
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

router.get("/project/:id", (req, res, next) => {
  console.log("Inside the get call");
  db.Projects.findOne({ _id: req.params.id })
    .then(data => {
      console.log(data);
      return res.json(data);
    })
    .catch(next);
});

router.post("/projects", (req, res) => {
  console.log("Inside the projects post call");
  console.log(req);

  if (req.body) {
    db.Projects.create(req.body)
      .then(data => {
        return res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.json({ error: "The item field is empty" });
  }
});

router.put("/project/:id", (req, res, next) => {
  console.log("Inside the PUT call");
  console.log(req.body);
  db.Projects.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name, notes: req.body.notes } }
  )
    .then(data => {
      console.log(data);
      return res.json(data);
    })
    .catch(next);
  return res.json(1);
});

router.delete("/projects/:id", (req, res, next) => {
  db.Projects.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
