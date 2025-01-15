import { Response } from "express";

const onGetMessages = async (
  res: Response,
  getAllMessages: () => Promise<Array<{ id: number; text: string }>>
) => {
  const allMessages = await getAllMessages();

  if (!allMessages.length) {
    res.status(204).send();
  } else {
    res.status(200).send(allMessages);
  }
};

export default onGetMessages;
