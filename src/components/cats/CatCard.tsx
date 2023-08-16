import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { type Cat } from "~/Types";
import CatSatus from "./CatSatus";

type catCardProps = {
    cat: Cat;
    handleCatCardClick: (cat: Cat) => void;
    handleEditCatClick: (cat: Cat) => void;
};

export default function CatCard({ cat, handleCatCardClick, handleEditCatClick }: catCardProps) {
    return (
        <Card>
            <CardActionArea
                sx={{ display: "flex", justifyContent: "start", alignItems: "start" }}
                onClick={() => handleCatCardClick(cat)}
            >
                <CardMedia
                    image={cat.photo}
                    sx={{
                        width: "250px",
                        height: "250px",
                    }}
                />
                <CardContent sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography gutterBottom variant="h5" component="div">
                            {cat.name},
                        </Typography>

                        <CatSatus status={cat.adoptionStatus} />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {cat.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
