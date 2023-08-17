import { Clear, Edit, List, Star } from "@mui/icons-material";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useMemo } from "react";
import { type Cat, type User } from "~/Types";
import { api } from "~/utils/api";
import CatSatus from "./CatSatus";

type catCardProps = {
    cat: Cat;
    user?: User;
    handleCatCardClick: (cat: Cat) => void;
    handleEditCatClick: (cat: Cat) => void;
    handleOpenOrdersModal: (cat: Cat) => void;
    deleteCat: (cat: { id: string }) => void;
};

export default function CatCard({
    cat,
    user,
    handleCatCardClick,
    handleEditCatClick,
    deleteCat,
    handleOpenOrdersModal,
}: catCardProps) {
    const utils = api.useContext();

    const { mutateAsync: addToFavoirt } = api.cats.addToFavoirt.useMutation({
        onSuccess: () => utils.cats.all.invalidate(),
    });
    const { mutateAsync: removeFromFavoirt } = api.cats.removeFromFavoirt.useMutation({
        onSuccess: () => utils.cats.all.invalidate(),
    });

    const { data: order } = api.orders.one.useQuery(
        { catId: cat.id, userId: user!.id },
        {
            enabled: Boolean(user),
        }
    );
    const { data: orders } = api.orders.all.useQuery({ catId: cat.id });

    const { mutateAsync: sendAdoptionRequest } = api.orders.sendAdoptionRequest.useMutation({
        onSuccess: () => utils.orders.one.invalidate({ catId: cat.id, userId: user!.id }),
    });
    const { mutateAsync: cancelAdoptionRequest } = api.orders.cancelAdoptionRequest.useMutation({
        onSuccess: () => utils.orders.one.invalidate({ catId: cat.id, userId: user!.id }),
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
                        <Box display="flex" gap={0.5}>
                            <Typography gutterBottom variant="h5" component="div">
                                {cat.name},{" "}
                            </Typography>

                            <CatSatus
                                status={
                                    order && cat.adoptionStatus.isAdoptable
                                        ? { id: "isPending", isAdoptable: false, isAdopted: false, isPending: true }
                                        : cat.adoptionStatus
                                }
                            />
                        </Box>

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
                            {user?.role === "admin" && !cat.adoptionStatus.isAdopted && (
                                <Button
                                    disabled={!orders?.length}
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        handleOpenOrdersModal(cat);
                                    }}
                                    endIcon={<List />}
                                >
                                    {orders?.length || 0}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        {cat.description}
                    </Typography>

                    {user?.role === "admin" && (
                        <Box display="flex" justifyContent="end" position="absolute" bottom={0} right={0} margin={1}>
                            <IconButton
                                color="warning"
                                disabled={cat.adoptionStatus.isAdopted}
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

                    {user?.role === "customer" && !cat.adoptionStatus.isAdopted && (
                        <Box display="flex" justifyContent="end" position="absolute" bottom={0} right={0} margin={1}>
                            {order ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        await cancelAdoptionRequest({
                                            catId: cat.id,
                                            userId: user.id,
                                        });
                                    }}
                                >
                                    Cancel adoption request
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        await sendAdoptionRequest({
                                            catId: cat.id,
                                            userId: user.id,
                                        });
                                    }}
                                >
                                    Send adoption request
                                </Button>
                            )}
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
