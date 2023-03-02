import { Post, User } from "../database/models";
import { Op } from "sequelize";

export const getPosts = async () => {
  return await Post.findAndCountAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password"] },
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

export const searchPost = async (q) => {
  const posts = await Post.findAndCountAll({
    where: {
      title: {
        [Op.like]: `%${q}%`,
      },
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password"] },
      },
    ],
    order: [["createdAt", "DESC"]],
  });
  return posts;
};

export const addPost = async (post) => {
  return await Post.create(post);
};

export const updatePostService = async (updated, id) => {
  const post = await Post.update(updated, {
    where: {
      id: id,
    },
  });
  return post;
};

export const getPost = async (id) => {
  const post = await Post.findOne({
    where: {
      id,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["password"] },
      },
    ],
  });
  return post;
};

export const deletePost = async (id) => {
  return await Post.destroy({
    where: {
      id,
    },
  });
};
