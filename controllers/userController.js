const { v4: uuidv4 } = require('uuid');
const userModel = require("../models/userModel");
const { setUser } = require("../services/authService")

const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userModel.create({
    name: name,
    email: email,
    password: password,
  });
  return res.redirect("/login", { user: newUser });
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "Invalid Username or Password" });
  }
  
  let token = setUser(user)
  res.cookie("uid" , token)
  return res.redirect("/");
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
