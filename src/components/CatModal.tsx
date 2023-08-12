import React, { useCallback } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { type Cat } from "~/Types";
import { api } from "~/utils/api";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export type CatModalProps = {
    cat?: Cat;
    open: boolean;
    onClose: () => void;
    variant?: "edit" | "create";
};

type CatForm = Cat;
const CatModal = ({ onClose, open, cat, variant }: CatModalProps) => {
    const utils = api.useContext();

    const { mutateAsync: addCat } = api.cats.create.useMutation();
    const { mutateAsync: updateCat } = api.cats.edit.useMutation();

    const { handleSubmit, register, control } = useForm<CatForm>();

    const onSubmit = useCallback(
        async (data: CatForm) => {
            if (variant === "create") {
                await addCat(data);
            } else if (variant === "edit") {
                await updateCat(data);
            }
            await utils.cats.all.invalidate();
            onClose();
        },
        [addCat, onClose, updateCat, utils.cats.all, variant]
    );

    return (
        <Dialog {...{ open, onClose }}>
            <DialogTitle>{cat?.name}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={4}>
                            {variant ? (
                                <TextField label="Name" {...register("name")} />
                            ) : (
                                <Typography>{cat?.name}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            {variant ? (
                                <TextField label="Description" {...register("description")} />
                            ) : (
                                <Typography>{cat?.description}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            {variant ? (
                                <TextField label="Adoption status" {...register("adoptionStatus")} />
                            ) : (
                                <Typography>{cat?.adoptionStatus}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            {variant ? (
                                <TextField label="Breed" {...register("breed")} />
                            ) : (
                                <Typography>{cat?.breed}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            {variant ? (
                                <TextField label="Gendre" {...register("gender")} />
                            ) : (
                                <Typography>{cat?.gender}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            {variant ? (
                                <Controller
                                    name="birthDate"
                                    control={control}
                                    render={({ field, ...props }) => {
                                        return (
                                            <DatePicker
                                                {...props}
                                                value={field.value}
                                                onChange={(date) => {
                                                    console.log({ date });
                                                    field.onChange(date);
                                                }}
                                                format="DD/MM/yyyy"
                                            />
                                        );
                                    }}
                                />
                            ) : (
                                <Typography>{cat?.birthDate.toISOString()}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            {variant ? (
                                <TextField label="City" {...register("city")} />
                            ) : (
                                <Typography>{cat?.city}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            {variant ? (
                                <TextField label="Picture url" {...register("photo")} />
                            ) : (
                                <Typography>{cat?.photo}</Typography>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {variant === "create" && <Button type="submit">Create</Button>}
                    {variant === "edit" && <Button type="submit">Update</Button>}
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CatModal;
