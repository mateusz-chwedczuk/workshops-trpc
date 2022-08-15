import * as cors from "cors";
import * as express from "express";
import "reflect-metadata";

const trpcApiEndpoint = "/trpc";
const playgroundEndpoint = "/playground";

async function bootstrap() {
  const app = express();

  app.use(cors());

  app.get("/", (req, res) => {
    res.send("ok");
  });

  app.listen(4000);
}

bootstrap();
