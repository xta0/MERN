const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Profile Model
const Profile = require("../../models/Profile");
const User = require("../../models/Users");

//@rout GET api/profile/test
//@desc Test profile rout
//@acess public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile Works" });
});

//@rout GET api/profile/test
//@desc Get current user's profile
//@acess private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  () => {},
  (req, res) => {}
);

module.exports = router;
