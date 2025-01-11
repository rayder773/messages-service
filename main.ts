import express from "express";
import onPostMessage from "./controllers/on_post_message";
import useMessageService from "./actions";

const app = express();
const db = {};
const logger = console;
const ws = {};

const messageService = useMessageService({ db, logger, ws });

app.post("/api/v1/message", (req, res) => onPostMessage(req, res, messageService));
