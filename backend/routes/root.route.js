const express = require("express");
const userRouter = require("./user.route");
const accountRouter = require("./account.route");

const router = express.Router();

router.use("/users", userRouter);
router.use("/accounts", accountRouter);

module.exports = router;
