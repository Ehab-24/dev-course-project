import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verifyRequiredFields } from "../utils.js";

export async function login(req, res) {
  try {
    if (!verifyRequiredFields(req.body, ["email", "password"])) {
      res.status(400).json({ message: "missing required fields" });
    }

    const body = req.body;
    const user = await User.findOne({ email: body.email });

    // check that user is registered AND the `passrword` is correct
    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      res.status(401).json({ message: "invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    delete user.password;
    res.status(200).json({ user, access_token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function register(req, res) {
  try {
    if (!verifyRequiredFields(req.body, ["name", "email", "password"])) {
      res.status(400).json({ message: "missing required fields" });
    }

    const { name, email, password } = req.body;

    // check if the user is already registered
    const duplicate = await User.findOne({ email: email });
    if (duplicate) {
      res.status(409).json({ message: "email already registered\n" });
      return;
    }

    // encrypt the plain text password
    const hashedPass = bcrypt.hashSync(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPass,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    delete user.password;
    res.status(201).json({ user, access_token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getAllUsers(_, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
