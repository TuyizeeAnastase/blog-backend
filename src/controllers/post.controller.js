import {
  getPosts,
  addPost,
  updatePostService,
  searchPost,
  deletePost,
} from "../services/blog.services";

export class postControllers {
  async createPost(req, res) {
    try {
      const user = req.user;
      const { title, content } = req.body;
      const newPost = await addPost({ title, content, userId: user.id });
      return res.status(201).json({
        message: "New Post created successfully",
        newPost,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Error while adding post,try again",
      });
    }
  }
  async getAllPost(req, res) {
    try {
      let posts;
      const { q } = req.query;
      if (q) {
        posts = await searchPost(q);
      } else {
        posts = await getPosts();
      }
      return res.status(200).json({
        posts,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error while getting posts",
        error: error.message,
      });
    }
  }

  async getPostController(req, res) {
    try {
      const post = req.post;
      return res.status(200).json({
        post,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error while getting post",
        error: error.message,
      });
    }
  }

  async updatePost(req, res) {
    try {
      const post = req.post;
      const { title, content } = req.body;
      await updatePostService({ title, content }, post.id);
      return res.status(200).json({
        goods: { id: post.id, ...req.body },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error while updating post",
        error: error.message,
      });
    }
  }

  async deletingPost(req, res) {
    try {
      const post = req.post;
      await deletePost(post.id);
      return res.status(200).json({
        message: "Post deleted",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error while deleting post",
        error: err.message,
      });
    }
  }
}

const postController = new postControllers();
export default postController;
