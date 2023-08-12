import { Box } from "@mui/material";
import { type Cat } from "~/Types";
import CatCard from "./CatCard";

type CardListProps = {
    cats: Cat[];
    onClick: (cat: Cat) => void;
};
const CatsList = ({ cats, onClick }: CardListProps) => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {cats.map((cat) => (
                <CatCard key={cat.id} cat={cat} onClick={onClick} />
            ))}
        </Box>
    );
};

export default CatsList;
