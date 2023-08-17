import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { type Cat } from "~/Types";
import { api } from "~/utils/api";
import { type SelectOption } from "../users/UserModal";
import CatSatus from "./CatSatus";

const genders: SelectOption[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
];

export type CatModalProps = {
    cat?: Cat;
    open: boolean;
    onClose: () => void;
    variant?: "edit" | "create";
};

type CatForm = Cat;
const CatModal = ({ onClose: _onClose, open, cat, variant }: CatModalProps) => {
    const utils = api.useContext();

    const { mutateAsync: addCat } = api.cats.create.useMutation();
    const { mutateAsync: updateCat } = api.cats.edit.useMutation();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue,
        trigger,
        reset,
    } = useForm<CatForm>({});

    useEffect(() => {
        if (cat) reset({ ...cat });
    }, [cat, reset]);

    const onClose = useCallback(() => {
        _onClose();
        reset({
            adoptionStatus: undefined,
            id: undefined,
            age: "",
            birthDate: new Date(),
            breed: "",
            city: "",
            description: "",
            gender: "",
            photo: "",
            name: "",
        });
    }, [_onClose, reset]);

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
        <Dialog {...{ open, onClose }} maxWidth="md" fullWidth>
            <DialogTitle>
                {variant === "create" && <Typography variant="h6">Add a new Cat</Typography>}
                {variant === "edit" && <Typography variant="h6">Edit Cat Info </Typography>}
                {!variant && cat && (
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5"> Cat information</Typography>
                        <CatSatus status={cat.adoptionStatus} />
                    </Box>
                )}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {variant ? (
                                <TextField
                                    label="Name"
                                    {...register("name", { required: true })}
                                    size="small"
                                    error={Boolean(errors.name)}
                                />
                            ) : (
                                <>
                                    <Typography fontWeight={600}>Name</Typography>
                                    <Typography>{cat?.name}</Typography>
                                </>
                            )}
                        </Grid>

                        <Grid item xs={4}>
                            {variant ? (
                                <Controller
                                    name="birthDate"
                                    control={control}
                                    defaultValue={new Date()}
                                    render={({ field, ...props }) => {
                                        return (
                                            <DatePicker
                                                label="Birth Date"
                                                {...props}
                                                value={field.value}
                                                onChange={(date) => {
                                                    field.onChange(date);
                                                }}
                                                slotProps={{
                                                    textField: { size: "small" },
                                                }}
                                            />
                                        );
                                    }}
                                />
                            ) : (
                                cat && (
                                    <>
                                        <Typography fontWeight={600}>Age</Typography>
                                        <Typography>{cat.age}</Typography>
                                    </>
                                )
                            )}
                        </Grid>

                        <Grid item xs={4}>
                            {variant ? (
                                <TextField
                                    label="Breed"
                                    {...register("breed", { required: true })}
                                    size="small"
                                    error={Boolean(errors.breed)}
                                />
                            ) : (
                                <>
                                    <Typography fontWeight={600}>Breed</Typography>
                                    <Typography>{cat?.breed}</Typography>
                                </>
                            )}
                        </Grid>

                        <Grid item xs={4}>
                            {variant ? (
                                <Controller
                                    control={control}
                                    rules={{ required: true }}
                                    name="gender"
                                    render={() => (
                                        <FormControl fullWidth>
                                            <InputLabel id="gender-select-label">Gender</InputLabel>
                                            <Select
                                                labelId="gender-select-label"
                                                size="small"
                                                label="Gender"
                                                error={Boolean(errors.gender)}
                                                onChange={(e) => {
                                                    setValue("gender", e.target.value as string);
                                                    trigger("gender");
                                                }}
                                            >
                                                {genders.map((gender) => (
                                                    <MenuItem key={gender.value} value={gender.value}>
                                                        {gender.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                ></Controller>
                            ) : (
                                <>
                                    <Typography fontWeight={600}>Gender</Typography>
                                    <Typography>{cat?.gender}</Typography>
                                </>
                            )}
                        </Grid>

                        <Grid item xs={4}>
                            {variant ? (
                                <TextField
                                    label="City"
                                    {...register("city", { required: true })}
                                    size="small"
                                    error={Boolean(errors.city)}
                                />
                            ) : (
                                <>
                                    <Typography fontWeight={600}>City</Typography>
                                    <Typography>{cat?.city}</Typography>
                                </>
                            )}
                        </Grid>

                        <Grid item xs={4}>
                            {variant && (
                                <TextField
                                    label="Picture url"
                                    {...register("photo", { required: true })}
                                    size="small"
                                    error={Boolean(errors.photo)}
                                />
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            {variant ? (
                                <TextField
                                    label="Description"
                                    {...register("description", { required: true })}
                                    size="small"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    maxRows={Infinity}
                                    error={Boolean(errors.description)}
                                />
                            ) : (
                                <>
                                    <Typography fontWeight={600}>Description</Typography>
                                    <Typography>{cat?.description}</Typography>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button onClick={onClose} variant="contained" color="secondary">
                        {!variant ? "Close" : "Cancel"}
                    </Button>

                    <Box marginLeft={2}>
                        {variant === "create" && (
                            <Button type="submit" variant="contained">
                                Create
                            </Button>
                        )}
                        {variant === "edit" && (
                            <Button type="submit" variant="contained">
                                Update
                            </Button>
                        )}
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CatModal;
