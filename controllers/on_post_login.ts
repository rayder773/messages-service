import { Request, Response } from "express";

const onPostLogin = async (
  req: Request,
  res: Response,
  getUserByEmailAndPass: () => Promise<unknown>
) => {
  const user = await getUserByEmailAndPass();

  if (!user) {
    res.status(401).send();
    return;
  }

  req.session.isAuth = true;
  res.status(200).send();
};

export default onPostLogin;
