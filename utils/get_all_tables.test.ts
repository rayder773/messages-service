import { TABLES } from "@/db";
import getAllTables from "./get_all_tables";
import setUpTests from "./setup_tests";

const { db } = setUpTests();

describe("logAllTables", () => {
  it("should log all tables", async () => {
    const tablesResult = await getAllTables(db);
    const tableNames = tablesResult.map((table: any) => Object.values(table)[0]);

    expect(Object.values(TABLES).every((table) => tableNames.includes(table))).toBe(true);
  });
});
