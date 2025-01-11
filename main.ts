import express from "express";
import onPostMessage from "./controllers/on_post_message";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.post("/api/v1/message", onPostMessage);

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
