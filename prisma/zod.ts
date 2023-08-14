import { z } from "zod";

export const AdoptionStatusModel = z.object({
    id: z.string(),
    isAdopted: z.boolean(),
    isPending: z.boolean(),
    isAdoptable: z.boolean(),
});

export const UserModel = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CatModel = z.object({
    id: z.string(),
    name: z.string(),
    birthDate: z.date(),
    breed: z.string(),
    gender: z.string(),
    city: z.string(),
    description: z.string(),
    photo: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
