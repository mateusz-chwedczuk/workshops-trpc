import { hash } from "@node-rs/argon2";
import { Service } from "typedi";
import { PrismaService } from "../../../prisma/prisma.service";
import { AddUserCommand } from "./add-user.command";

@Service()
export class AddUserHandler {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: AddUserCommand) {
    await this.prisma.client.user.create({
      data: { email: command.email, password: await hash(command.password) },
    });
  }
}
