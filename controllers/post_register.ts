import { User } from "@/types";
import { Request, Response } from "express";

const postRegister = async (
  _: Request,
  res: Response,
  createUser: () => Promise<unknown>,
  getUser: () => Promise<User>
) => {
  const user = await getUser();

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const createdUser = await createUser();

  res.status(200).json(createdUser);
};

export default postRegister;
