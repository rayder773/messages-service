import { Express } from "express";
import onPostMessage from "./controllers/on_post_message";
import onGetMessages from "./controllers/on_get_messages";

function addRoutes(app: Express) {
  app.post("/api/v1/messages", onPostMessage);
  app.get("/api/v1/messages", onGetMessages);
}

export { addRoutes };
