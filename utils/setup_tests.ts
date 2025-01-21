import { newDb } from "pg-mem";
import { Knex } from "knex";
import { Express } from "express";
import { MemoryStore } from "express-session";
import { IBackup } from "pg-mem";
import { allHandlers, createApp } from "@/server";

const setUpDbForTest = () => {
  const mem = newDb();
  const db = mem.adapters.createKnex();

  return {
    db,
    createBackup: () => mem.backup(),
  };
};

function setUpTests(handlers?: (db: Knex) => Record<string, any>) {
  const { db, createBackup } = setUpDbForTest();

  const store = new MemoryStore();
  const app: Express = createApp({
    ...allHandlers,
    ...(handlers?.(db) ?? {}),
    store,
  });

  let backup: IBackup;

  beforeAll(async () => {
    await db.migrate.latest();

    backup = createBackup();
  });

  beforeEach(() => {
    backup.restore();
    store.clear();
  });

  return {
    db,
    app,
    store,
  };
}

export default setUpTests;
