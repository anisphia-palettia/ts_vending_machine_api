import { db } from "../../src/config/db.conf";

async function seed() {
  const hash = await Bun.password.hash("admin");

  await db.admin.upsert({
    where: { username: "admin" },
    create: { username: "admin", password: hash },
    update: {},
  });
}

seed();
