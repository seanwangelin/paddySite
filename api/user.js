const express = require("express");
const userRouter = express.Router();

const {
  getAllUsers,
  getUserByUsername
} = require('../db/models/user')

userRouter.get("/", async (req, res) => {
    const users = await getAllUsers();
  
    res.send({
      users,
    });
  });

  userRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please suplly both a username and a password",
      });
    }
  
    try {
      const user = await getUserByUsername(username);
      if (!user) {
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      } else if (user && user.password == password) {
        res.send({ user, message: "you're logged in!" });
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  
  userRouter.post("/register", async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const queriedUser = await getUserByUsername(username);
      if (queriedUser) {
        res.status(401);
        next({
          name: "UserExistsError",
          message: "A user by that username already exists",
        });
      } else {
        const user = await createUser({
          username,
          password,
        });
        if (!user) {
          next({
            name: "UserCreationError",
            message: "An error occured during registration. Please try again",
          });
        } else {
          res.send({ user, message: "you're signed up!" });
        }
      }
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = userRouter;