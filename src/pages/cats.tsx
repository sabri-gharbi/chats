import { Box, Button } from "@mui/material";
import CatsList from "~/components/cats/CatsList";
import { api } from "~/utils/api";
import { useState } from "react";
import CatModal, { type CatModalProps } from "~/components/cats/CatModal";
import { type Cat } from "~/Types";

export default function Cats() {
    const { data: cats, isLoading: isCatsLoading } = api.cats.all.useQuery();

    const [selectedCat, setSelectedCat] = useState<Cat>();
    const [catModalShown, setCatModalShown] = useState<boolean>(false);
    const [catModalvariant, setCatModalVariant] = useState<CatModalProps["variant"]>();

    const handleCloseCatModal = () => {
        setCatModalShown(false);
        setSelectedCat(undefined);
    };

    const handleCatCardClick = (cat: Cat) => {
        setSelectedCat(cat);
        setCatModalVariant(undefined);
        setCatModalShown(true);
    };

    const handleEditCatClick = (cat: Cat) => {
        setSelectedCat(cat);
        setCatModalVariant(undefined);
        setCatModalShown(true);
    };

    const handleOpenCreateCatModal = () => {
        setSelectedCat(undefined);
        setCatModalVariant("create");
        setCatModalShown(true);
    };

    return (
        <>
            <CatModal cat={selectedCat} open={catModalShown} onClose={handleCloseCatModal} variant={catModalvariant} />

            <Button onClick={handleOpenCreateCatModal}>Add a Cat</Button>

            <Box display="flex" flexDirection="column" justifyContent="center">
                <CatsList
                    cats={cats ?? []}
                    handleCatCardClick={handleCatCardClick}
                    handleEditCatClick={handleEditCatClick}
                />
            </Box>
        </>
    );
}
