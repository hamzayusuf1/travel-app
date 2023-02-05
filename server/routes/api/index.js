const router = require("express").Router();
const userRoutes = require("./userRoutes");
const placesRoutes = require("./placesRoutes");

router.use("/places", placesRoutes);
router.use("/user", userRoutes);

module.exports = router;
