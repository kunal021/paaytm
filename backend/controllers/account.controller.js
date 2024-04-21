// const zod = require("zod");
// const User = require("../model/user.model");
const mongoose = require("mongoose");
const Account = require("../model/account.model");
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET;

exports.getBalance = async (req, res) => {
  const acoount = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    message: "sucesss",
    balance: acoount.balance,
  });
};

exports.transfer = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;
  const account = await Account.findOne({ useId: req.useId }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Insufficient Balance" });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);
  await session.commitTransaction();

  res.json({
    message: "sucess",
  });
};
