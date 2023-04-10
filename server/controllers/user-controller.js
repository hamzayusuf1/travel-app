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
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   console.log(errors);
    //   throw new Error("Invalid inputs passed, please check your information");
    // }

    const { name, email, password } = req.body;

    let existingUser;

    existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(404);
    }
    // .then((user) => {
    //   !user
    //     ? res.json(user)
    //     : res
    //         .status(404)
    //         .json({ error: "User exists, please login instead" });
    // })
    // .catch((err) => {
    //   res.status(500).json(err);
    // });

    User.create({ ...req.body, id: uuidv4() })
      .then((user) => {
        res.json({ user: user });
      })
      .catch((err) => {
        res.status(500).json(err);
      });

    // try {
    //   newUser = await Place.create({ ...req.body, id: uuidv4() });
    // } catch (error) {
    //   res.status(500).json({ error: "Creating place failed" });
    // }

    // res.status(201).json({ user: newUser });
  },
  async login(req, res, next) {
    // try {
    //   const { email, password } = req.body;
    //   console.log(user);
    //   if (!user || user.password != password) {
    //     throw new Error("Could not indentify the user", { statusbar: 404 });
    //   }
    //   res.json({ message: "You have been logged in succesfully" });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json(error);
    // }

    let existingUser;

    try {
      existingUser = await User.findOne({ email: req.body.email });
    } catch (error) {
      res.status(500).json(err);
    }

    if (!existingUser) {
      // throw new Error("No user that matches that email address");
      return res.status(400).json({ message: "Can't find this user" });
    }

    if (existingUser.password !== req.body.password) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    res.status(201).json({ message: "lOGGED IN" });
  },
};
