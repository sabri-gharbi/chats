import { useState } from "react";
import CatCard from "./CatCard";
import { api } from "~/utils/api";
import { Box } from "@mui/material";
import CatModal from "./CatModal";
import { type Cat } from "~/Types";

const CatsList = () => {
  const { data: cats } = api.cats.all.useQuery();

  const [selectedCat, setSelectedCat] = useState<Cat>();

  const [catModalShown, setCatModalShown] = useState<boolean>(false);

  const handleCloseCatModal = () => {
    setCatModalShown(false);
    setSelectedCat(undefined);
  };

  const handleCatCardClick = (cat: Cat) => {
    setSelectedCat(cat);
    setCatModalShown(true);
  };

  return (
    <>
      {selectedCat && (
        <CatModal
          cat={selectedCat}
          open={catModalShown}
          onClose={handleCloseCatModal}
        />
      )}

      <Box display="flex" flexDirection="column" gap={2}>
        {(cats ?? []).map((cat) => (
          <CatCard key={cat.id} cat={cat} onClick={handleCatCardClick} />
        ))}
      </Box>
    </>
  );
};

export default CatsList;
