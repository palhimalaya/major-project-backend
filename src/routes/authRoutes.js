const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//dot env
require("dotenv").config();

const User = require("../models/userModel");

router.post("/login", async (req, res) => {
  // Get the username and password from the request body
  const { email, password } = await req.body;

  // Find the user in the database
  const user = await User.findOne({ email });
  if (!user) {
    // If the user doesn't exist, return a not found error
    res.status(404).send("User not found");
  } else {
    // Compare the provided password with the stored password
    if (user.password !== password) {
      res.status(400).send("Invalid password");
    } else {
      // If the credentials are valid, generate a JSON web token
      const token = jwt.sign({ id: user.id }, process.env.SECRET);

      // Return the token to the client
      res.status(200).send({ token });
    }
  }
});

router.post("/signup", async (req, res) => {
  // Get the user information from the request body

  const { fullName, email, password } = await req.body;

  // Create a new user object
  const user = new User({
    fullName,
    email,
    password,
  });

  // Save the user to the database
  user.save((err) => {
    if (err) {
      // If there was an error, return a server error
      res.status(500).send("Server error");
    } else {
      // Generate a JSON web token
      const token = jwt.sign({ id: user.id }, process.env.SECRET);

      // Return the token to the client
      res.send({ token });
    }
  });
});

module.exports = router;
