import { CatModel } from "prisma/zod";
import { z } from "zod";
import { BaseUserModel } from "../users/zod";

export const BaseCatModel = CatModel.omit({
    createdAt: true,
    updatedAt: true,
});

export const CreateCatInput = BaseCatModel.omit({
    id: true,
});

export const UpdateCatInput = BaseCatModel;

export const DeleteCatInput = z.object({ id: BaseCatModel.shape.id });

export const GetCatInput = z.object({ id: BaseCatModel.shape.id });

export const FavoritInput = z.object({ userId: BaseUserModel.shape.id, catId: BaseCatModel.shape.id });
