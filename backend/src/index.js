import express from "express";
import "dotenv/config";
import cors from "cors";
import chalk from "chalk";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import connectToDB from "./config/db.config.js";
import rootRouter from "./routes/index.js";
import fileUpload from "express-fileupload";

// Initailizing Our Express Server 👇🏼
const app = express();

// Before Middleware Configs 👇🏼
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // Use in-memory storage
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(helmet());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

// Route Config 👇🏼
app.use("/api", rootRouter);

// After Middelware Config 👇🏼
app.use(errorHandler);

// Listening Our Server after Database Connection 👇🏼
const PORT = process.env.PORT;
connectToDB(() =>
  app.listen(PORT, () => {
    console.log(chalk.white(`Server Is Running on: http://localhost:${PORT}`));
  })
);
