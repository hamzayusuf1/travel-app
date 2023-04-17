const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Place = require("../models/Place");
const { Error } = require("mongoose");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Hamza yusuf",
    image: "https://picsum.photos/200/300",
    places: 1,
    email: "hamza@yusuf.com",
    password: "hamza123",
  },
  {
    id: "u2",
    name: "John Doe",
    image: "https://picsum.photos/200/300",
    places: 10,
    email: "hamza1@yusuf.com",
    password: "hamza321",
  },
];

module.exports = {
  getUsers(req, res) {
    try {
      User.find().then((users) => res.json(users));
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async signUp(req, res) {
    const { name, email, password } = req.body;

    let existingUser;

    existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(404);
    }

    User.create({ ...req.body, id: uuidv4() })
      .then((user) => {
        res.json({ user: user });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  async login(req, res, next) {
    let existingUser;

    try {
      existingUser = await User.findOne({ email: req.body.email });
    } catch (error) {
      res.status(500).json(err);
    }

    if (!existingUser) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    if (existingUser.password !== req.body.password) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    res.status(201).json({ message: "lOGGED IN" });
  },
};
