const express = require("express");

const { loginUser, registerUser } = require("../controllers/authController.js");

module.exports = express
  .Router()
  .post("/login", async (req, res) => {
    await loginUser(req, res);
  })
  .post("/register", async (req, res) => {
    await registerUser(req, res);
  });
