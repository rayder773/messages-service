import { Response, Request } from "express";

const onPostLogin = (req: Request, res: Response, getUserByEmail: () => Promise<unknown>) => {
  req.session.test = "228";

  res.status(200).send();
};

export default onPostLogin;
