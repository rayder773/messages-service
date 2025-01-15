import bodyParser from "body-parser";
import express, { Request, Response, Express } from "express";
import { getClient, queryBuilder } from "./db";
import onPostMessage from "./controllers/on_post_message";
import createMessage from "./actions/create_message";
import onGetMessages from "./controllers/on_get_messages";
import getAllMessages from "./actions/get_all_messages";
import { Knex } from "knex";

const END_POINTS = {
  POST_MESSAGE: "/api/v1/messages",
  GET_MESSAGES: "/api/v1/messages",
};

const createApp = ({
  app = express(),
  onPostMessage,
  onGetMessages,
}: {
  app?: Express;
  onPostMessage: (req: Request, res: Response) => void;
  onGetMessages: (req: Request, res: Response) => void;
}) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post(END_POINTS.POST_MESSAGE, onPostMessage);
  app.get(END_POINTS.GET_MESSAGES, onGetMessages);

  return app;
};

const onPostMessageHanler = (queryBuilder: Knex) => (req: Request, res: Response) =>
  onPostMessage(res, () => createMessage(req.body, queryBuilder));

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
};

export {
  onPostMessageHanler,
  onGetMessagesHandler,
  startServer,
  createApp,
  allHandlers,
  END_POINTS,
};
