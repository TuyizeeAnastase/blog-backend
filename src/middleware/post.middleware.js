import { Post } from "../database/models";
import { getPost } from "../services/blog.services";

export const checkPostExist = async (req, res, next) => {
  const { title } = req.body;
  const post = await Post.findAll({
    where: {
      title: title.toLowerCase(),
    },
  });
  if (post.length > 0) {
    res.status(400).json({
      message: "Post provided, is already Exist",
    });
    return false;
  }
  next();
};

export const checkPostExistById = async (req, res, next) => {
  const { id } = req.params;
  const post = await getPost(id);
  if (!post) {
    res.status(404).json({
      message: "Post doesn't exist",
    });
    return false;
  }
  req.post = post;
  next();
};

export const checkBlogOwner = async (req, res, next) => {
  const userId = req.user.id;
  const postUser = req.post.userId;
  if (userId !== postUser) {
    res.status(404).json({
      message: "Post doesn't belongs to you",
    });
    return false;
  }
  next();
};
