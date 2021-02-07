import User from "../models/User.js";
import validator from "express-validator";
const { validationResult } = validator;
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });
    await user.hash(password);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    if (!(await user.comparePasswords(password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send("server error");
  }
};
