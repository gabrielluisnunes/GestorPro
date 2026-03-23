import * as dotenv from "dotenv";
import * as path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? "postgres",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_DATABASE ?? "gestorpro",
  entities: [__dirname + "/entities/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: false,
});
