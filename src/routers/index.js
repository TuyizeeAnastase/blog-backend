import express from "express";
import userRoutes from "./user.route";
import postRouters from "./post.route";

const routes = express();
routes.get("/", (req, res) => {
  res.status(200).json({
    message: "This is Blog Backend",
  });
});

routes.use("/api/v1/users", userRoutes);
routes.use("/api/v1/posts", postRouters);

routes.get("*", (req, res) => {
  res.status(404).json({
    message: "Page not found,try again",
  });
});

export default routes;
