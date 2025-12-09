import { HTTPException } from "hono/http-exception";
import honoFactory from "../../lib/hono_factory";
import zodValidator from "../../middleware/zod_validator";
import api_response from "../../utils/api_response";
import { slugifyUtil } from "../../utils/slugfy";
import {
  productUpdateInputSchema,
  productCreateInputSchema,
  productIdParamSchema,
  productUpdateQuantityInputSchema,
} from "../schema/product.schema";
import productService from "../service/product.service";

const productHandler = honoFactory.createApp();

productHandler.post(
  "",
  zodValidator("form", productCreateInputSchema),
  async (c) => {
    const data = c.req.valid("form");

    const file = data.image;
    const buffer = Buffer.from(await file.arrayBuffer());
    await Bun.write(`public/${file.name}`, buffer);

    const product = await productService.insert({
      ...data,
      image: file.name,
      slug: slugifyUtil(data.name),
    });

    return api_response.success(c, {
      message: "Product created successfully",
      data: product,
    });
  },
);

productHandler.put(
  "/:id",
  zodValidator("param", productIdParamSchema),
  zodValidator("form", productUpdateInputSchema),
  async (c) => {
    const param = c.req.valid("param");
    const data = c.req.valid("form");

    console.log(data);

    const old = await productService.findById(param.id);

    if (!old) {
      throw new HTTPException(404, {
        message: "Product not found",
      });
    }

    let fileName = old.image;
    let slug = old.slug;

    if (data.image) {
      const file = data.image;
      const buffer = Buffer.from(await file.arrayBuffer());
      await Bun.write(`public/${file.name}`, buffer);
      fileName = file.name;
    }

    if (data.name) {
      slug = slugifyUtil(data.name);
    }

    const product = await productService.update(old.id, {
      ...data,
      image: fileName,
      slug,
    });

    return api_response.success(c, {
      message: "Product updated successfully",
      data: product,
    });
  },
);

productHandler.put(
  "/:id/quantity",
  zodValidator("param", productIdParamSchema),
  zodValidator("json", productUpdateQuantityInputSchema),
  async (c) => {
    const param = c.req.valid("param");
    const data = c.req.valid("json");

    const product = await productService.findById(param.id);

    if (!product) {
      throw new HTTPException(404, {
        message: "Product not found",
      });
    }

    await productService.updateQuantity(param.id, data.quantity);

    return api_response.success(c, {
      message: "Product quantity updated successfully",
      data: product,
    });
  },
);

productHandler.get("/", async (c) => {
  const products = await productService.findAll();

  return api_response.success(c, {
    message: "Products fetched successfully",
    data: products,
  });
});

export default productHandler;
