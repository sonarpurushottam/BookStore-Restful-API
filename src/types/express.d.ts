// src/types/express.d.ts
import { User } from "../models/user";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: number;
    };
  }
}

declare module "express" {
  export interface Request {
    user?: any;
  }
}
