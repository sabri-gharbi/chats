import { useState } from "react";
import CatCard from "./CatCard";
import { api } from "~/utils/api";
import { Box, Button } from "@mui/material";
import CatModal from "./CatModal";
import { type Cat } from "~/Types";

const CatsList = () => {
    const { mutate: createCat } = api.cats.create.useMutation();

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
            {selectedCat && <CatModal cat={selectedCat} open={catModalShown} onClose={handleCloseCatModal} />}

            <Button onClick={() => createCat()}>Ceate a cat</Button>

            {/* <Box display="flex" flexDirection="column" gap={2}>
              {(cats ?? []).map((cat) => (
                  <CatCard key={cat.id} cat={cat} onClick={handleCatCardClick} />
              ))}
          </Box> */}
        </>
    );
};

export default CatsList;
