// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getRegister = (req, res) => {
  res.render("users/register");
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect("/products");
  } catch (error) {
    res.status(400).render("users/register", { error: "Đăng ký thất bại" });
  }
};
