export declare module "express-session" {
  interface SessionData {
    views?: number;
    user?: {
      id: string;
      username: string;
      email?: string;
    };
  }
}