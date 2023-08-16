import { Clear, Edit, Star } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useMemo } from "react";
import { type Cat, type User } from "~/Types";
import { api } from "~/utils/api";
import CatSatus from "./CatSatus";

type catCardProps = {
    cat: Cat;
    user?: User;
    handleCatCardClick: (cat: Cat) => void;
    handleEditCatClick: (cat: Cat) => void;
    deleteCat: (cat: { id: string }) => void;
};

export default function CatCard({ cat, user, handleCatCardClick, handleEditCatClick, deleteCat }: catCardProps) {
    const utils = api.useContext();

    const { mutateAsync: addToFavoirt } = api.cats.addToFavoirt.useMutation({
        onSuccess: () => utils.cats.all.invalidate(),
    });
    const { mutateAsync: removeFromFavoirt } = api.cats.removeFromFavoirt.useMutation({
        onSuccess: () => utils.cats.all.invalidate(),
    });

    const isFavorit = useMemo(() => {
        if (!user) return false;

        return cat.catLoversIds.includes(user.id);
    }, [cat, user]);

    return (
        <Card>
            <CardActionArea
                sx={{ display: "flex", justifyContent: "start", alignItems: "start" }}
                onClick={() => handleCatCardClick(cat)}
            >
                <CardMedia
                    image={cat.photo}
                    sx={{
                        width: "200px",
                        height: "200px",
                    }}
                />
                <CardContent sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography gutterBottom variant="h5" component="div">
                            {cat.name}
                        </Typography>

                        <Box display="flex">
                            {user?.role === "customer" && (
                                <IconButton
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        if (!isFavorit) {
                                            await addToFavoirt({
                                                userId: user.id,
                                                catId: cat.id,
                                            });
                                        } else {
                                            await removeFromFavoirt({ userId: user.id, catId: cat.id });
                                        }
                                    }}
                                >
                                    <Star
                                        sx={{
                                            color: isFavorit ? (theme) => theme.palette.yellow.main : undefined,
                                        }}
                                    />
                                </IconButton>
                            )}

                            <CatSatus status={cat.adoptionStatus} />
                        </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        {cat.description}
                    </Typography>

                    {user?.role === "admin" && (
                        <Box display="flex" justifyContent="end" position="absolute" bottom={0} right={0} margin={1}>
                            <IconButton
                                color="warning"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditCatClick(cat);
                                }}
                            >
                                <Edit />
                            </IconButton>

                            <IconButton
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const response = window.confirm(
                                        "Are you sure you want to delete this cute cat from the list ??"
                                    );
                                    if (response) deleteCat({ id: cat.id });
                                }}
                            >
                                <Clear />
                            </IconButton>
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
