import { Express } from "express";
import { IBackup } from "pg-mem";
import { Knex } from "knex";
import { allHandlers, createApp, onPostMessageHanler } from "@/server";
import setUpTests from "@/utils/setup_tests";

let app: Express;
let backup: IBackup;
let db: Knex;

beforeAll(async () => {
  const { db: dbInstance, backup: backupInstance } = await setUpTests();

  db = dbInstance;
  backup = backupInstance;

  app = createApp({
    ...allHandlers,
    onPostMessage: onPostMessageHanler(db),
  });
});

beforeEach(() => {
  backup.restore();
});

describe("POST /login", () => {
  it("should return 200 if user exists", async () => {});
});
