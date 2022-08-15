import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";
import { user1, user2 } from "./seeds/users";

export const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.upsert({
    where: { id: user1.id },
    create: {
      ...user1,
      password: await hash(user1.password),
    },
    update: {},
  });
  await prisma.user.upsert({
    where: { id: user2.id },
    create: {
      ...user2,
      password: await hash(user2.password),
    },
    update: {},
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
