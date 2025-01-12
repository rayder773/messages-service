import express from "express";
import onPostMessage from "./controllers/on_post_message";
import dotenv from "dotenv";
import { getClient } from "./db";

dotenv.config();

const app = express();

app.post("/api/v1/message", onPostMessage);

const port = process.env.APP_PORT || 3000;

const startServer = async () => {
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

startServer();
