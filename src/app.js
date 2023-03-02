import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routers";
import morgan from "morgan";
import cloadinary from "cloudinary";
import fileupload from "express-fileupload";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cors());
app.use(routes);

const server = app.listen(
  PORT,
  console.log(`Server listening to PORT ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  server.close(() => process.exit(1));
});

export default app;