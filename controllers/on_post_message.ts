import { Response, Request, NextFunction } from "express";
import Joi from "joi";

const onPostMessage = async (res: Response, createMessage: () => Promise<unknown>) => {
  const result = (await createMessage()) as any;

  if (result?.hasError) {
    res.status(500).send();
    return;
  }

  res.status(201).send();
};

const validatePostMessageBody = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    res.status(400).send();
    return;
  }

  next();
};

export { validatePostMessageBody };

export default onPostMessage;
