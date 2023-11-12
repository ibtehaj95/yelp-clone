const express = require("express");
const {getAllRestaurants, getRestaurant, createRestaurant, deleteRestaurant, updateRestaurant,} = require("../controllers/restaurants");

const router = express.Router();

router.route("/").post(createRestaurant).get(getAllRestaurants);
router.route("/:id").patch(updateRestaurant).get(getRestaurant).delete(deleteRestaurant);

module.exports = router;