import { z } from "zod";

export const CatModel = z.object({
    id: z.string(),
    name: z.string(),
    birthDate: z.date(),
    breed: z.string(),
    gender: z.string(),
    city: z.string(),
    description: z.string(),
    photo: z.string(),
    adoptionStatus: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
