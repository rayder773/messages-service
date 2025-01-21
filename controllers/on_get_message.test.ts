import { onGetMessagesHandler } from "@/server";
import request from "supertest";
import { END_POINTS } from "@/server";
import { TABLES } from "@/db";
import setUpTests from "@/utils/setup_tests";

const { app, db } = setUpTests((db) => ({
  onGetMessages: onGetMessagesHandler(db),
}));

describe("GET /messages", () => {
  it("should return empty array if no messages", async () => {
    const response = await request(app).get(END_POINTS.GET_MESSAGES);

    expect(response.status).toBe(204);
  });

  it("should return all messages", async () => {
    const messages = [{ text: "Hello" }, { text: "World" }];
    await db(TABLES.MESSAGES).insert(messages);

    const response = await request(app).get(END_POINTS.GET_MESSAGES);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      messages.map((message, index) => ({ id: index + 1, ...message }))
    );
  });
});
