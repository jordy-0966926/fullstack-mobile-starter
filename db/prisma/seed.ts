import { hash } from "@node-rs/argon2";
import { users } from "./seedData";

import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({
  connectionString,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // admin user
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: "admin@example.com",
      name: "Admin",
      surname: "User",
      password: await hash("admin"),
      admin: true,
    },
  });

  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    const userId = index + 2;

    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: user.email,
        name: user.name,
        surname: user.surname,
        password: await hash(user.email),
      },
    });
  }

  // Without this inserts that rely on default ids can fail with duplicate key errors
  await prisma.$executeRawUnsafe(
    "SELECT setval(pg_get_serial_sequence('user', 'id'), COALESCE((SELECT MAX(id) FROM \"user\"), 1));",
  );

  console.log("Seeding completed successfully.");
  console.log("Total users seeded:", users.length);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
