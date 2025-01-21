import { Request, Response } from "express";

const logoutSession = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.status(204).send("Logged out");
  });
};

export default logoutSession;
