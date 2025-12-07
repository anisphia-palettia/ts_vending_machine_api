import { db } from "../../config/db.conf";
import type { ProductCreateInput } from "../../generated/prisma/models";

const insert = async (data: ProductCreateInput) => {
  const product = await db.product.create({
    data,
  });
  return product;
};

const findAll = async () => {
  return db.product.findMany();
};

const update = async (id: number, data: ProductCreateInput) => {
  const product = await db.product.update({
    where: { id },
    data,
  });
  return product;
};

const remove = async (id: number) => {
  const product = await db.product.delete({
    where: { id },
  });
  return product;
};

export default { insert, findAll, update, remove };
