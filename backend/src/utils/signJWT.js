import jwt from "jsonwebtoken";
const JWT_KEY = process.env._JWT_KEY;

const signJWT = (payload, exIn) => {
  return jwt.sign(payload, JWT_KEY, { expiresIn: exIn || "1d" });
};

export default signJWT;
