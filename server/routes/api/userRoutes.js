const router = require("express").Router();
const { check } = require("express-validator");

const {
  getUsers,
  login,
  signUp,
} = require("../../controllers/user-controller");

router.get("/", getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signUp
);

router.post("/login", login);

module.exports = router;
