import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function login(req, res) {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });

    // check that user is registered AND the `passrword` is correct
    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      res.status(401).send("invalid credentials");
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).json({ access_token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // check if the user is already registered
    const duplicate = await User.findOne({ email: email });
    if (duplicate) {
      res.status(409).send("email already registered\n");
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
    res.status(201).json({ inserted_id: user._id, access_token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
