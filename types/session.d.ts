import "express-session";

declare module "express-session" {
  interface SessionData {
    isAuth?: boolean;
    user?: {
      email: string;
    };
  }
}
