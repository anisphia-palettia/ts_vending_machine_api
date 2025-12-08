import { db } from "../../config/db.conf";
import type {
  ProductCreateInput,
  ProductUpdateInput,
} from "../../generated/prisma/models";

const insert = async (data: ProductCreateInput) => {
  const product = await db.product.create({
    data,
  });
  return product;
};

const findAll = async () => {
  return db.product.findMany();
};

const update = async (id: number, data: ProductUpdateInput) => {
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

const findById = async (id: number) => {
  const product = await db.product.findUnique({
    where: { id },
  });
  return product;
};

const findBySlug = async (slug: string) => {
  const product = await db.product.findUnique({
    where: { slug },
  });
  return product;
};

const updateQuantity = async (id: number, quantity: number) => {
  return db.product.update({
    where: { id },
    data: {
      quantity: {
        increment: quantity,
      },
    },
  });
};

export default {
  insert,
  findAll,
  update,
  remove,
  findById,
  findBySlug,
  updateQuantity,
};
