import express from "express";
import "dotenv/config";
import cors from "cors";
import init from "./configs/init";
import webhookRouter from "./modules/callback/routers";
import { handleExpressError } from "./utils/express";
import messageRouter from "./modules/message/routers";

init();
const app = express();
app.use(
  cors({
    origin: true,
    maxAge: 60 * 10, // 10 mins
    /* preflightContinue: true, */
    credentials: true,
    exposedHeaders: [
      "content-disposition",
      "content-length",
      "content-type",
      "date",
      "etag",
    ],
  })
);
// middleware routers
app.use(express.json());

//   webhook endpoint
app.use("/webhook", webhookRouter);
app.use("/message", messageRouter);

handleExpressError(app);
process.on("unhandledRejection", (reason, promise) => {
  console.error("unhandledRejection:", reason);
  console.error("unhandledRejection:", promise);
});

// error handler for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("uncaughtException:", error);
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () =>
  console.log(`Server 🚀 Started http://localhost:${PORT}/  `)
);
