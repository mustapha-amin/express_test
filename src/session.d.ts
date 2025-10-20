import { User } from "./models/user.ts";

export declare module "express-session" {
  interface SessionData {
    views?: number;
    user?: User;
  }
}