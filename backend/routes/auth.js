const express = require("express");
const {login, register, verify, clearCookie} = require("../controllers/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify").post(verify);
router.route("/logout").post(clearCookie);

module.exports = router;