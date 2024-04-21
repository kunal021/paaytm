const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { getBalance, transfer } = require("../controllers/account.controller");
const router = express.Router();

router
  .get("/balance", authMiddleware, getBalance)
  .post("/transfer", authMiddleware, transfer);

module.exports = router;
