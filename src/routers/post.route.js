import express from "express";
import postController from "../controllers/post.controller";
import { postValidation } from "../validations/post.validations";
import {
  checkPostExist,
  checkPostExistById,
  checkBlogOwner,
} from "../middleware/post.middleware";
import { protect } from "../middleware/protect.middleware";

const router = express();

router
  .route("/")
  .post(protect, postValidation, checkPostExist, postController.createPost)
  .get(postController.getAllPost);

router
  .route("/:id")
  .get(checkPostExistById, postController.getPostController)
  .patch(protect, checkPostExistById, checkBlogOwner, postController.updatePost)
  .delete(
    protect,
    checkPostExistById,
    checkBlogOwner,
    postController.deletingPost
  );

export default router;
