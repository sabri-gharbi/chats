import React from "react";
import CatCard from "./CatCard";
import { api } from "~/utils/api";
import { Box } from "@mui/material";

const CatsList = () => {
  const { data: cats } = api.cats.all.useQuery();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {(cats ?? []).map((cats) => (
        <CatCard key={cats.id} />
      ))}
    </Box>
  );
};

export default CatsList;
