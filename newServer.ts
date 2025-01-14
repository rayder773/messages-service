import bodyParser from "body-parser";
import express from "express";
import { END_POINTS } from "./router";
import { getClient, queryBuilder } from "./db";
import dotenv from "dotenv";
import onPostMessage from "./controllers/on_post_message";
import createMessage from "./actions/create_message";

dotenv.config();

const emptyFunction = (req: express.Request, res: express.Response) => {};

const runServer = async ({
  app = express(),
  onPostMessage = emptyFunction,
  onGetMessages = emptyFunction,
}: {
  app?: express.Express;
  onPostMessage?: (req: express.Request, res: express.Response) => void;
  onGetMessages?: (req: express.Request, res: express.Response) => void;
}) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post(END_POINTS.POST_MESSAGE, onPostMessage);
  app.get(END_POINTS.GET_MESSAGES, onGetMessages);

  const port = Number(process.env.PORT) || 3000;

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

export default runServer;

runServer({
  onPostMessage: (req: express.Request, res: express.Response) => onPostMessage(req, res),
});
