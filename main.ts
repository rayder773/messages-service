import express from "express";
import onPostMessage from "./controllers/on_post_message";

const app = express();

app.post("/api/v1/message", onPostMessage);
