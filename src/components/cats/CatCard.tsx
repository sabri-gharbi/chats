import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { type Cat } from "~/Types";

type catCardProps = {
    cat: Cat;
    handleCatCardClick: (cat: Cat) => void;
    handleEditCatClick: (cat: Cat) => void;
};

export default function CatCard({ cat, handleCatCardClick, handleEditCatClick }: catCardProps) {
    return (
        <Card>
            <CardActionArea sx={{ display: "flex" }} onClick={() => handleCatCardClick(cat)}>
                <CardMedia component="img" height="140" image={cat.photo} alt={cat.name} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {cat.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {cat.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
