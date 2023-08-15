import { type RouterInputs, type RouterOutputs } from "~/utils/api";

export type User = RouterOutputs["users"]["all"][number];
