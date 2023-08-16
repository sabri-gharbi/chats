import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import { type Cat } from "~/Types";
import { CatsAppContext } from "~/components/Layout";
import CatCard from "~/components/cats/CatCard";
import CatModal, { type CatModalProps } from "~/components/cats/CatModal";
import { api } from "~/utils/api";

export default function Cats() {
    const utils = api.useContext();

    const { data: cats } = api.cats.all.useQuery();
    const { mutate: deleteCat } = api.cats.delete.useMutation({
        onSuccess: () => {
            utils.cats.all.invalidate();
        },
    });

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
        setCatModalVariant("edit");
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
                            user={user}
                            key={cat.id}
                            cat={cat}
                            handleCatCardClick={handleCatCardClick}
                            handleEditCatClick={handleEditCatClick}
                            deleteCat={deleteCat}
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
