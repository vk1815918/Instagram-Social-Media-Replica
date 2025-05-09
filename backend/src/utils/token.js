import crypto from "crypto";
import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("JWT secret(s) missing in environment variables.");
}

export const generateAccessToken = (payload, expiresIn = "15m") => {
  return jwt.sign({ userId: payload.userId }, ACCESS_TOKEN_SECRET, { expiresIn });
};

export const generateRefreshToken = (userId, expiresIn = "30d") => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn });
};

export const generateToken = (round = 20) => {
  return crypto.randomBytes(round).toString("hex");
};
