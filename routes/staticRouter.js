const express = require("express");
const router = express.Router();
const URL = require("../models/urlModel");

router.get("/", async (req, res) => {
  if(!req.user) return res.redirect("/login")
  const urls = await URL.find({createdBy : req.user._id});
  return res.render("index", { urls: urls });
});



module.exports = router;
