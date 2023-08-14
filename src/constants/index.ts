type SeededCatStatusIds = "isAdopted" | "isPending" | "isAdoptable";

export const seededCatStatusIds: Record<SeededCatStatusIds, { id: SeededCatStatusIds }> = {
    isAdoptable: { id: "isAdoptable" },
    isAdopted: { id: "isAdopted" },
    isPending: { id: "isPending" },
};
