import { Request, Response } from "express";
import { MessageServiceAPI } from "../types";

const onPostMessage = async (
  req: Request,
  res: Response,
  messageService: MessageServiceAPI
) => {
  await messageService.createMessage();

  res.status(201).send();
};

export default onPostMessage;
