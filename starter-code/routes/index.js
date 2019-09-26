const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then(celebrities => {
      console.log("Estas son TODAS las celebridades", celebrities);
      res.render("celebrities/index", { title: "Celebrities", celebrities });
    })
    .catch(err => console.log(err));
});

router.get("/celebrities/:id", (req, res) => {
  console.log("here i am");
  let { id } = req.params;
  Celebrity.findById(id)
    .then(celebrity => {
      console.log("This is ONE celebrity:", celebrity);
      res.render("celebrities/show", { title: "show", celebrity });
    })
    .catch(err => console.log(err));
});

router.post("/celebrities/:id", (req, res) => {
  let celebrity = { ...req.body };
  let { id } = req.params;
  Celebrity.findByIdAndUpdate(id, { $set: celebrity })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(err => console.log(err));
});

router.get("/celebrities-new", (req, res) => {
  res.render("celebrities/new");
});

router.post("/celebrities", (req, res) => {
  // console.log("req.body this time is:", req.body);
  let celebrity = { ...req.body };
  console.log("THIS IS A CELEBRITY:", celebrity);
  Celebrity.create(celebrity)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(err => {
      // res.render("celebrities-new");
      console.log(err);
    });
});

router.post("/celebrities/:id/delete", (req, res) => {
  let { id } = req.params;

  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(err => console.log(err));
});

router.get("/celebrities/:id/edit", (req, res) => {
  let { id } = req.params;
  Celebrity.findById(id)
    .then(celebrity => {
      console.log("TO EDIT:", celebrity);
      res.render("celebrities/edit", { title: "edit", celebrity });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
