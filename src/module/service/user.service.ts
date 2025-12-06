import { db } from "../../config/db.conf";

const findAdminByUsername = async (username: string) => {
  const admin = await db.admin.findUnique({
    where: {
      username,
    },
  });

  return admin;
};

export { findAdminByUsername };
