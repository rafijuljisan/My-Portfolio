import path from "node:path";
import { defineConfig } from "prisma/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: "file:./prisma/dev.db",
  },
  migrate: {
    adapter: async () => {
      return new PrismaBetterSqlite3("./prisma/dev.db");
    },
  },
});