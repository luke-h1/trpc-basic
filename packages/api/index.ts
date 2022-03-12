import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

const appRouter = trpc.router().query("hello", {
  resolve() {
    return "Hello TRPC world";
  },
});

const app = express();
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
    batching: { enabled: true },
  })
);
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello from api");
});

app.listen(port, () => {
  console.log(`api listening at http://localhost:${port}`);
});
