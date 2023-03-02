import { User } from "../database/models";

export const registerUser = async (user) => {
  return await User.create(user);
};

export const getUserById = async (id) => {
  return await User.findOne({
    where: {
      id,
    },
  });
};
