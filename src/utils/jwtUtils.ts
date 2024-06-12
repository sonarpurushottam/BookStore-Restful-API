import jwt from "jsonwebtoken";
import User from "../models/user";

export const generateToken = (user: User): string => {
  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
