import crypto from "crypto";
import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const generateAccessToken = (payload, expiresIn) => {
  return jwt.sign({ userId: payload.userId }, accessTokenSecret, {
    expiresIn: expiresIn || "15m",
  });
};

export const generateRefreshToken = (userId, expiresIn) => {
  return jwt.sign({ userId }, refreshTokenSecret, {
    expiresIn: expiresIn || "30d",
  });
};

export const generateToken = (round) => {
  return crypto.randomBytes(round || 20).toString("hex");
};
