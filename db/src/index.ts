import { prisma } from "../lib/prisma";

async function index() {
  const user = await prisma.user.findFirst();
  console.log(user);
}

index();
