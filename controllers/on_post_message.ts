import { Request, Response } from "express";
import createMessage from "../actions/create_message";

const onPostMessage = async (req: Request, res: Response) => {
  await createMessage();

  res.status(201).send();
};

export default onPostMessage;
