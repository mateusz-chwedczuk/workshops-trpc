import * as trpcExpress from "@trpc/server/adapters/express";
import * as cors from "cors";
import * as express from "express";
import "reflect-metadata";
import { expressHandler } from "trpc-playground/handlers/express";
import { appRouter } from "./app.router";

const trpcApiEndpoint = "/trpc";
const playgroundEndpoint = "/playground";

async function bootstrap() {
  const app = express();

  app.use(cors());

  app.use(
    trpcApiEndpoint,
    trpcExpress.createExpressMiddleware({
      router: appRouter,
    })
  );

  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint,
      playgroundEndpoint,
      router: appRouter,
    })
  );

  app.get("/", (req, res) => {
    res.send("ok");
  });

  app.listen(4000);
}

bootstrap();
