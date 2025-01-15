import { Response } from "express";

const onPostMessage = async (res: Response, createMessage: () => Promise<void>) => {
  const result = await createMessage();

  res.status(201).send();
};

export default onPostMessage;
