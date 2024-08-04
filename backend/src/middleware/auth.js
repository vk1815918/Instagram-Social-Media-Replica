import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const auth = async (req, res, next) => {
  // Geting Token from authraiztion or cookies 👇🏼
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    res.status(401).json({
      message: "Login First",
    });
    return;
  }

  try {
    // Decoding token 👇🏼
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    delete decoded.iat;
    delete decoded.exp;

    // Get user profile then send to next middleware👇🏼
    const userId = decoded.userId;
    const userDoc = await User.findById(userId);

    // Check user is available 👇🏼
    if (!userDoc) {
      res
        .status(400)
        .clearCookie("refreshToken")
        .json({
          status: "error",
          action: "remove_access_token",
          message: "User not found",
        });
      return;
    }
    req.userDoc = userDoc;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please login", err: error.message });
  }
};

export default auth;
