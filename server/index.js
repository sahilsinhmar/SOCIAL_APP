import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import { connectToDB } from "./db/connect.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import { register } from "../server/controllers/auth.js";
import { createPost } from "../server/controllers/post.js";
import { verifyToken } from "./middleware/Authentication.js";

// configuration and middlewares
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
const corsOptions = {
  origin: ["https://social-app-vert-one.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Add PATCH to allowed methods
  credentials: true,
};

app.use(cors(corsOptions));

// File storage

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

app.post("/api/v1/auth/register", upload.single("file"), register);
app.post("/api/v1/post", verifyToken, upload.single("file"), createPost);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", verifyToken, userRouter);
app.use("/api/v1/posts", verifyToken, postRouter);

const PORT = process.env.PORT || 6001;

const start = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server is listening to ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
