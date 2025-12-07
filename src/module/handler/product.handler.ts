import honoFactory from "../../lib/hono_factory";
import zodValidator from "../../middleware/zod_validator";
import api_response from "../../utils/api_response";
import { slugifyUtil } from "../../utils/slugfy";
import { productCreateInputSchema } from "../schema/product.schema";
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

productHandler.get("/", async (c) => {
  const products = await productService.findAll();

  return api_response.success(c, {
    message: "Products fetched successfully",
    data: products,
  });
});

export default productHandler;
