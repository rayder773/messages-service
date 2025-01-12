import { Request, Response } from "express";
import getAllMessages from "../actions/get_all_messages";

const onGetMessages = async (_: Request, res: Response) => {
  const allMessages = await getAllMessages();

  res.status(200).send(allMessages);
};

export default onGetMessages;
