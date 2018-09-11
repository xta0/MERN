const app = require("express");
const router = app.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Hello!" });
});
module.exports = router;
