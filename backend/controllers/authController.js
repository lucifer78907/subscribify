const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.signUp = async (req, res, next) => {
  // check for errors

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    let user = await User.findOne({ email: email });
    if (user) {
      //user was found
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      email,
      username,
      password: hashedPassword,
    });

    const response = await user.save();
    res.status(201).json({
      message: "User created in database",
      userId: response._id,
      status: 201,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    // check if email doesn't exists then throw an error
    let user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User doesn't exists");
      error.statusCode = 404;
      throw error;
    }
    // compare pass if exists
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({
      message: "Successfully logged in",
      status: 200,
      userId: user._id,
      hasAnyActivePlan: user.plan === null,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
