import { Service } from "typedi";
import { PrismaService } from "../../../prisma/prisma.service";
import { GetUsersQuery } from "./get-users.query";

@Service()
export class GetUsersHandler {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetUsersQuery) {
    return await this.prisma.client.user.findMany({});
  }
}
