import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  //add alias for @/* - ./
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // алиас для '@' ссылается на корень проекта
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
};

export default config;
