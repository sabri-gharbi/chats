import { Box } from "@mui/material";
import CatsList from "~/components/CatsList";
import { api } from "~/utils/api";
import { useState } from "react";
import CatModal from "~/components/CatModal";
import { type Cat } from "~/Types";

export default function Home() {
    const { data: cats, isLoading: isCatsLoading } = api.cats.all.useQuery();

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
            <Box display="flex" flexDirection="column" justifyContent="center">
                <CatsList cats={cats ?? []} onClick={handleCatCardClick} />
            </Box>
        </>
    );
}
