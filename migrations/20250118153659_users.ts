import { TABLES } from "@/db";
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLES.users, (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
  });

  await knex.schema.createTable(TABLES.roles, (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
  });

  await knex.schema.createTable(TABLES.userRoles, (table) => {
    table.increments("id").primary();
    table.integer("userId").unsigned().references("id").inTable(TABLES.users).onDelete("CASCADE");
    table.integer("roleId").unsigned().references("id").inTable(TABLES.roles).onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLES.users);
  await knex.schema.dropTable(TABLES.roles);
  await knex.schema.dropTable(TABLES.userRoles);
}
