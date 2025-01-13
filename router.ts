import { Express } from "express";
import onPostMessage from "./controllers/on_post_message";
import onGetMessages from "./controllers/on_get_messages";

const END_POINTS = {
  POST_MESSAGE: "/api/v1/messages",
  GET_MESSAGES: "/api/v1/messages",
};

function addRoutes(app: Express) {
  app.post(END_POINTS.POST_MESSAGE, onPostMessage);
  app.get(END_POINTS.GET_MESSAGES, onGetMessages);
}

export { addRoutes, END_POINTS };
