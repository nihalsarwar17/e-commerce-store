import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
  // can catch error inside Async func
  "/signin",
  //   when there's amy error then, it executes
  // middleware from index.js
  expressAsyncHandler(async (req, res) => {
    // checks email in the database
    const user = await User.findOne({ email: req.body.email });
    // if user email is available then check password
    if (user) {
      // password entered by user, encrypted password in database
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
          token: generateToken(user) // user credentials
        });
        return;
      }
    }
    // if email or password is incorrect, send error message
    res.status(401).send({ message: "Incorrect email or password" });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User ({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      // password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user) // user credentials
    });
    
  }));

export default userRouter