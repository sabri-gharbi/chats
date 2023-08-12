import { type RouterInputs, type RouterOutputs } from "~/utils/api";

export type UpdateCatInput = RouterInputs["cats"]["edit"];
export type CreateCatInput = RouterInputs["cats"]["create"];

export type Cat = RouterOutputs["cats"]["all"][number];
