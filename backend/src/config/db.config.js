import chalk from "chalk";
import mongoose from "mongoose";

async function connectToDB(server) {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(chalk.red(chalk.underline("Database Connected Successfully")));
    await server();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectToDB;
