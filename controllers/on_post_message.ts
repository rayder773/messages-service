import { Response } from "express";

const onPostMessage = async (res: Response, createMessage: () => Promise<unknown>) => {
  const result = (await createMessage()) as any;

  if (result?.hasError) {
    res.status(500).send();
    return;
  }

  res.status(201).send();
};

export default onPostMessage;
