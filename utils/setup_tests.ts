import { newDb } from "pg-mem";

async function setUpTests() {
  const mem = newDb();
  const db = mem.adapters.createKnex();

  await db.migrate.latest();

  const backup = mem.backup();

  return {
    db,
    backup,
  };
}

export default setUpTests;
