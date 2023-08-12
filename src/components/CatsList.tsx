import { Box } from "@mui/material";
import { type Cat } from "~/Types";
import CatCard from "./CatCard";

type CardListProps = {
    cats: Cat[];
    handleCatCardClick: (cat: Cat) => void;
    handleEditCatClick: (cat: Cat) => void;
};
const CatsList = ({ cats, handleCatCardClick, handleEditCatClick }: CardListProps) => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {cats.map((cat) => (
                <CatCard
                    key={cat.id}
                    cat={cat}
                    handleCatCardClick={handleCatCardClick}
                    handleEditCatClick={handleEditCatClick}
                />
            ))}
        </Box>
    );
};

export default CatsList;
