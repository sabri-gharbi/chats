import { CatModel, UserModel } from "prisma/zod";
import { z } from "zod";

export const OrderInput = z.object({
    userId: UserModel.shape.id,
    catId: CatModel.shape.id,
});

export const GetAllOrderInput = z
    .object({
        catId: CatModel.shape.id,
    })
    .optional();
