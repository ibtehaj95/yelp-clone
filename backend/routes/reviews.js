const express = require("express");
const {
    getAllReviews,
    getReviewsOneRestaurant,
    createReview,
    deleteReview,
    updateReview,
} = require("../controllers/reviews");

const router = express.Router();

router.route("/").post(createReview).get(getAllReviews);
router.route("/:id").patch(updateReview).get(getReviewsOneRestaurant).delete(deleteReview);

module.exports = router;