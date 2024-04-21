const express = require("express");
const {
  signup,
  signin,
  update,
  filter,
  user,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router
  .post("/signup", signup)
  .post("/signin", signin)
  .put("/update", authMiddleware, update)
  .get("/filter", filter)
  .get("/user/:id", user);

module.exports = router;
