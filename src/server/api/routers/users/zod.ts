import { CatModel, UserModel } from "prisma/zod";
import { z } from "zod";

export const BaseUserModel = UserModel.omit({
    createdAt: true,
    updatedAt: true,
});

export const CreateUserInput = BaseUserModel.omit({
    id: true,
});

export const UpdateUserInput = BaseUserModel;

export const GetUserInput = z.object({ id: BaseUserModel.shape.id });
