import * as trpc from "@trpc/server";
import { userRouter } from "./user/user.router";

export const appRouter = trpc.router().merge("user.", userRouter);

export type AppRouter = typeof appRouter;
