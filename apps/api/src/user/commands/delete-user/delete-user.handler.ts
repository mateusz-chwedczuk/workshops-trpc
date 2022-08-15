import { Service } from "typedi";
import { PrismaService } from "../../../prisma/prisma.service";
import { DeleteUserCommand } from "./delete-user.command";

@Service()
export class DeleteUserHandler {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteUserCommand) {
    await this.prisma.client.user.delete({ where: { id: command.id } });
  }
}
