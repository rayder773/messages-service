import { app } from "../server";
import request from "supertest";
import { newDb } from "pg-mem";
import { Knex as KnexType } from "knex";
import { addRoutes } from "../router";
import { queryBuilder } from "@/db";

beforeAll(() => {
  addRoutes(app);
});

beforeAll(async () => {
  await queryBuilder.migrate.latest();
});

afterAll(async () => {
  await queryBuilder.migrate.rollback();
  await queryBuilder.destroy();
});

jest.mock("@/db", () => {
  const mem = newDb();
  const actual = jest.requireActual("@/db");

  const knex: KnexType = mem.adapters.createKnex();

  return {
    ...actual,
    queryBuilder: knex,
  };
});

describe("POST /message", () => {
  it("should create a message", async () => {
    const messageText = "Hello, world!";
    const response = await request(app).post("/api/v1/messages").send({ text: messageText });

    expect(response.status).toBe(201);
  });
});
