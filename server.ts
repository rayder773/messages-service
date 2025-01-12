import express from "express";
import onPostMessage from "./controllers/on_post_message";
import dotenv from "dotenv";
import { getClient } from "./db";
import bodyParser = require("body-parser");
import onGetMessages from "./controllers/on_get_messages";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/v1/messages", onPostMessage);
app.get("/api/v1/messages", onGetMessages);

const startServer = async (port: number) => {
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

export { app, startServer };
