import { Box, Button } from "@mui/material";
import { api } from "~/utils/api";
import { useContext, useState } from "react";
import CatModal, { type CatModalProps } from "~/components/cats/CatModal";
import { type Cat } from "~/Types";
import { CatsAppContext } from "~/components/Layout";
import CatCard from "~/components/cats/CatCard";

export default function Cats() {
    const { data: cats } = api.cats.all.useQuery();

    const [selectedCat, setSelectedCat] = useState<Cat>();
    const [catModalShown, setCatModalShown] = useState<boolean>(false);
    const [catModalvariant, setCatModalVariant] = useState<CatModalProps["variant"]>();

    const { user } = useContext(CatsAppContext);

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
        <Box display="flex" flexDirection="column" padding={4}>
            <CatModal cat={selectedCat} open={catModalShown} onClose={handleCloseCatModal} variant={catModalvariant} />

            <Box display="flex" flexDirection="column" justifyContent="center" marginBottom={2}>
                <Box display="flex" flexDirection="column" gap={2}>
                    {(cats ?? []).map((cat) => (
                        <CatCard
                            key={cat.id}
                            cat={cat}
                            handleCatCardClick={handleCatCardClick}
                            handleEditCatClick={handleEditCatClick}
                        />
                    ))}
                </Box>
            </Box>

            {user?.role.toLowerCase() === "admin" && (
                <Button variant="contained" onClick={handleOpenCreateCatModal}>
                    Add a Cat
                </Button>
            )}
        </Box>
    );
}
