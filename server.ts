import bodyParser from "body-parser";
import express, { Request, Response, Express, NextFunction } from "express";
import { getClient, queryBuilder } from "./db";
import onPostMessage from "./controllers/on_post_message";
import createMessage from "./actions/create_message";
import onGetMessages from "./controllers/on_get_messages";
import getAllMessages from "./actions/get_all_messages";
import { Knex } from "knex";
import validateRequest from "./utils/validate_request";
import Joi from "joi";
import onPostLogin from "./controllers/on_post_login";
import { getUserByEmail, getUserByEmailAndPass } from "./actions/get_user";
import setupSession from "./utils/setup_session";
import { MemoryStore } from "express-session";
import postRegister from "./controllers/post_register";
import createUser from "./actions/create_user";
import logoutSession from "./controllers/logout_session";

const END_POINTS = {
  POST_MESSAGE: "/api/v1/messages",
  GET_MESSAGES: "/api/v1/messages",
  POST_LOGIN: "/api/v1/login",
  POST_LOGOUT: "/api/v1/logout",
  POST_REGISTER: "/api/v1/register",
};

type Handler = Array<(req: Request, res: Response, next: NextFunction) => void>;

const createApp = ({
  app = express(),
  onPostMessage,
  onGetMessages,
  onPostLogin,
  onPostLogout,
  onPostRegister,
  store,
}: {
  app?: Express;
  onPostMessage: Handler;
  onPostLogout: Handler;
  onPostRegister: Handler;
  onGetMessages: (req: Request, res: Response) => void;
  onPostLogin: Handler;
  store: MemoryStore;
}) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(setupSession(store));

  app.post(END_POINTS.POST_MESSAGE, ...onPostMessage);
  app.get(END_POINTS.GET_MESSAGES, onGetMessages);

  app.post(END_POINTS.POST_LOGIN, ...onPostLogin);
  app.post(END_POINTS.POST_LOGOUT, ...onPostLogout);
  app.post(END_POINTS.POST_REGISTER, ...onPostRegister);

  return app;
};

const onPostMessageHanler = (queryBuilder: Knex) => [
  validateRequest.bind(null, Joi.object({ text: Joi.string().required() })),
  (req: Request, res: Response) => onPostMessage(res, () => createMessage(req.body, queryBuilder)),
];

const onPostLoginHandler = (queryBuilder: Knex) => [
  (req: Request, res: Response) =>
    onPostLogin(req, res, () =>
      getUserByEmailAndPass(req.body.email, req.body.password, queryBuilder)
    ),
];

const onPostLogoutHandler = () => [logoutSession];
const onPostRegisterHandler = (queryBuilder: Knex) => [
  validateRequest.bind(
    null,
    Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() })
  ),
  (req: Request, res: Response) =>
    postRegister(
      req,
      res,
      () =>
        createUser(
          {
            email: req.body.email,
            password: req.body.password,
          },
          queryBuilder
        ),
      () => getUserByEmail(req.body.email, queryBuilder)
    ),
];

const onGetMessagesHandler = (queryBuilder: Knex) => (_: Request, res: Response) =>
  onGetMessages(res, () => getAllMessages(queryBuilder));

const startServer = async (port: number, app: Express) => {
  try {
    const client = await getClient();
    console.log("Connection to database via pg.Pool is successful!");
    client.release(); // Возвращаем клиент в пул

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to database via pg.Pool:", error);
    process.exit(1); // Завершаем процесс с ненулевым кодом
  }
};

const allHandlers = {
  onGetMessages: onGetMessagesHandler(queryBuilder),
  onPostMessage: onPostMessageHanler(queryBuilder),
  onPostLogin: onPostLoginHandler(queryBuilder),
  onPostLogout: onPostLogoutHandler(),
  onPostRegister: onPostRegisterHandler(queryBuilder),
  store: new MemoryStore(),
};

export {
  onPostMessageHanler,
  onGetMessagesHandler,
  onPostLoginHandler,
  onPostLogoutHandler,
  onPostRegisterHandler,
  startServer,
  createApp,
  allHandlers,
  END_POINTS,
};
