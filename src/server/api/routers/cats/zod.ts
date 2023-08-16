import { CatModel } from "prisma/zod";
import { z } from "zod";

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
