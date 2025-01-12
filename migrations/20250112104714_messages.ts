import type { Knex } from "knex";
import { TABLES } from "../db";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLES.MESSAGES, (table) => {
    table.increments("id").primary();
    table.text("text").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLES.MESSAGES);
}
