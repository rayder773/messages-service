import Joi from "joi";
import { Response, NextFunction, Request } from "express";

const validateRequest = (
  schema: Joi.ObjectSchema,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    res.status(400).send({
      message: validationResult.error.details[0].message,
    });
    return;
  }

  next();
};

export default validateRequest;
