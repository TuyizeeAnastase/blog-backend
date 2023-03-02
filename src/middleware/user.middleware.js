import { User } from "../database/models";

export const checkUserExist = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findAll({
    where: {
      email,
    },
  });
  if (user.length > 0) {
    res.status(400).json({
      message: "User with email provided, is already registered",
    });
    return false;
  }
  next();
};

export const checkUserRegistered = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(400).json({
      message: "User doesn't exist,Please register",
    });
    return false;
  }
  req.user = user;
  next();
};
