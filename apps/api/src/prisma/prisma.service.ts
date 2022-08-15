import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class PrismaService {
  client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
    this.client.$connect();
  }
}
