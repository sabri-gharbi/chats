import { Box, Button } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { type Cat } from "~/Types";
import { CatsAppContext } from "~/components/layout";
import CatCard from "~/components/cats/CatCard";
import CatModal, { type CatModalProps } from "~/components/cats/CatModal";
import CatsToolBar from "~/components/cats/CatsToolBar";
import { api } from "~/utils/api";

export type SortCatsFields = Extract<keyof Cat, "name" | "city" | "adoptionStatus">;
export const SortFieldsOption: { label: string; value: SortCatsFields }[] = [
    { label: "Name", value: "name" },
    { label: "City", value: "city" },
    { label: "Adoption Status", value: "adoptionStatus" },
];

export type FilterCatsFields = { catLover: string };

export default function Cats() {
    const utils = api.useContext();
    const { user } = useContext(CatsAppContext);

    const { data } = api.cats.all.useQuery();
    const { mutate: deleteCat } = api.cats.delete.useMutation({
        onSuccess: () => {
            utils.cats.all.invalidate();
        },
    });

    const [selectedCat, setSelectedCat] = useState<Cat>();
    const [catModalShown, setCatModalShown] = useState<boolean>(false);
    const [catModalvariant, setCatModalVariant] = useState<CatModalProps["variant"]>();

    const [sortField, setSortField] = useState<SortCatsFields>();
    const [filter, setFilter] = useState<FilterCatsFields>();

    const cats = useMemo(() => {
        const filtredData = (data || []).filter((item) => {
            if (!filter) {
                return true;
            }

            return item.catLoversIds.includes(filter.catLover);
        });

        if (!sortField) return filtredData;

        return filtredData.sort((a, b) => {
            if (sortField === "adoptionStatus") return a.adoptionStatus.id.localeCompare(b.adoptionStatus.id);

            return a[sortField].localeCompare(b[sortField]);
        });
    }, [data, filter, sortField]);

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
        <Box display="flex" flexDirection="column" padding={4} paddingTop={2}>
            <CatsToolBar filter={filter} setFilter={setFilter} sortField={sortField} setSortField={setSortField} />

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

            <CatModal cat={selectedCat} open={catModalShown} onClose={handleCloseCatModal} variant={catModalvariant} />
        </Box>
    );
}
