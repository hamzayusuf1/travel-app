const router = require("express").Router();
const { check } = require("express-validator");

const {
  getPlaces,
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../../controllers/places-controller");

router
  .route("/")
  .get(getPlaces)
  .post(
    [
      check("title").not().isEmpty(),
      check("description").isLength({ min: 5 }),
      check("address").not().isEmpty(),
    ],
    createPlace
  );

router.get("/user/:uid", getPlaceByUserId);

router.get("/:id", getPlaceById);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

router.put(
  "/:id",
  // [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);

router.delete("/:id", deletePlace);

module.exports = router;
