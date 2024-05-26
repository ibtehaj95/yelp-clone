const express = require("express");
const {
    getAllReviews,
    getReview,
    createReview,
    deleteReview,
    updateReview,
} = require("../controllers/reviews");

const router = express.Router();

router.route("/").post(createReview).get(getAllReviews);
router.route("/:id").patch(updateReview).get(getReview).delete(deleteReview);

module.exports = router;