const zod = require("zod");
const User = require("../model/user.model");
const Account = require("../model/account.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

exports.signup = async (req, res) => {
  const { success, data } = signupBody.safeParse(req.body);
  console.log(success, data);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect input",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect input",
    });
  }

  // const { username, password, firstName, lastName } = req.body;

  const user = await User.create({
    username: data.username,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    message: "User created sucessfully",
    token: token,
  });
};

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

exports.signin = async (req, res) => {
  const { success, data } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error while loggin in",
    });
  }

  // const { username, password } = req.body;
  const user = await User.findOne({
    username: data.username,
    password: data.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
      data: user._id,
    });

    return;
  }

  return res.status(411).json({
    message: "Error while logging in",
  });
};
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

exports.update = async (req, res) => {
  const { success, data } = updateBody.safeParse(req.body);
  console.log(success, data);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, data);

  console.log(req.body);

  res.json({
    message: "Updated successfully",
  });
};

exports.filter = async (req, res) => {
  const filter = req.query.filter || "";
  // const users = await User.find({
  //   $or: [
  //     {
  //       firstName: {
  //         $regex: filter,
  //         $options: "i",
  //       },
  //     },
  //     {
  //       lastName: {
  //         $regex: filter,
  //         $options: "i",
  //       },
  //     },
  //   ],
  // });

  const users = await User.find({});

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(filter.toLowerCase());
  });
  const result = filteredUsers.map((user) => ({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    _id: user._id,
  }));
  res.json({
    user: result,
  });
};

exports.user = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(411).json({ message: "No such user present" });
  }
  res.json({
    result: user,
  });
};
