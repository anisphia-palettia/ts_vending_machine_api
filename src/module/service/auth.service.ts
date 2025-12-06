import type { LoginInputSchema } from "../schema/auth.schema";
import { findAdminByUsername } from "./user.service";

const login = async (data: LoginInputSchema) => {
  const admin = await findAdminByUsername(data.username);

  if (!admin) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = await Bun.password.verify(
    data.password,
    admin.password,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  return admin;
};

export default { login };
