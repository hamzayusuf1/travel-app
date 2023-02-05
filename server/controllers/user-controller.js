const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const User = require("../models/User");

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
      res.json({ DUMMY_USERS });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  signUp(req, res) {
    // try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      throw new Error("Invalid inputs passed, please check your information");
    }

    const { name, email, password } = req.body;

    const userExists = DUMMY_USERS.find((u) => {
      return u.email === email;
    });

    console.log(userExists);

    if (userExists) {
      throw new Error("User already exists");
    }

    const createdUser = {
      id: uuidv4(),
      name,
      email,
      password,
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json(createdUser);
    // } catch (error) {
    //   res.status(500).json({ message: "User already exists" });
    // }
  },
  login(req, res) {
    try {
      const { email, password } = req.body;

      console.log(password);

      const user = DUMMY_USERS.find((u) => {
        return u.email == email;
      });

      console.log(user);

      if (!user || user.password != password) {
        throw new Error("Could not indentify the user", { statusbar: 404 });
      }
      res.json({ message: "You have been logged in succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
