import * as trpc from "@trpc/server";
import { Container } from "typedi";
import { z } from "zod";
import { AddUserHandler } from "./commands/add-user/add-user.handler";
import { DeleteUserHandler } from "./commands/delete-user/delete-user.handler";
import { GetUsersHandler } from "./queries/get-users/get-users.handler";

export const userRouter = trpc
  .router()
  .query("getUsers", {
    async resolve(req) {
      const users = await Container.get(GetUsersHandler).execute({});
      return users;
    },
  })
  .mutation("addUser", {
    input: z.object({ email: z.string(), password: z.string() }),
    async resolve(req) {
      await Container.get(AddUserHandler).execute(req.input);
    },
  })
  .mutation("deleteUser", {
    input: z.object({ id: z.string() }),
    async resolve(req) {
      await Container.get(DeleteUserHandler).execute(req.input);
    },
  });
