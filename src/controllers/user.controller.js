import { registerUser } from "../services/user.services";
import { getToken } from "../utils/token";
import bcrypt from "bcryptjs";

export class userControllers {
  async registerUSer(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = {
        name: name,
        email: email,
        password: hashedPassword,
      };
      const user = await registerUser(newUser);
      return res.status(201).json({
        message: "User created successfully",
        user: { ...user.dataValues, password: "" },
      });
    } catch (err) {
      return res.status(500).json({
        Error: err.message,
        message: "Error while registering usr",
      });
    }
  }
  async login(req, res) {
    try {
      const { password } = req.body;
      const user = req.user;
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
          message: "Password does not match!",
        });
      }
      const token = getToken({ id: user.id, role: user.name });
      return res.status(200).json({
        token: token,
        user: {
          user_id: user.id,
          names: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while logging in, try Again",
        error: error.message,
      });
    }
  }
}

const userController = new userControllers();
export default userController;
