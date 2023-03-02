import { decoding } from "../utils/token";
import { getUserById } from "../services/user.services";

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: "Please login,",
    });
  }
  try {
    const decoded = await decoding(token);
    const user = await getUserById(decoded.id);
    req.user = user;
    req.logged_user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Please login to access",
    });
  }
};
