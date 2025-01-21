import { getUserByEmail } from "@/actions/get_user";
import { checkPassword } from "@/utils/password";
import { Request, Response } from "express";
import { Knex } from "knex";

const onPostLogin = async (req: Request, res: Response, queryBuilder: Knex) => {
  const user = await getUserByEmail(req.body.email, queryBuilder);

  if (!user) {
    res.status(401).send();
    return;
  }

  const checkPasswordResult = await checkPassword(req.body.password, user?.password);

  if (!checkPasswordResult) {
    res.status(401).send();
    return;
  }

  req.session.isAuth = true;
  res.status(200).send();
};

export default onPostLogin;
