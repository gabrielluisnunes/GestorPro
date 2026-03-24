import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { mkdirSync } from "fs";
import { join } from "path";
import * as express from "express";
import { getUploadsRoot } from "./config/upload-paths";
import { AppModule } from "./app.module";

async function bootstrap() {
  const uploadRoot = getUploadsRoot();
  mkdirSync(join(uploadRoot, "documents"), { recursive: true });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("api");
  app.use("/api/files", express.static(uploadRoot));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  app.enableCors();

  await app.listen(process.env.PORT ?? 3333);
}

bootstrap();
