import { db } from "../../src/config/db.conf";

async function seed() {
  const hash = await Bun.password.hash("1234");

  await db.admin.upsert({
    where: { username: "1234" },
    create: { username: "1234", password: hash },
    update: {},
  });
}

seed();
