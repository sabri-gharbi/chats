import {
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
} from "@mui/material";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { type User } from "~/Types";
import { api } from "~/utils/api";

export type SelectOption = {
    label: string;
    value: string;
};

export const roles: SelectOption[] = [
    { label: "Admin", value: "admin" },
    { label: "Customer", value: "customer" },
];

export type UserModalProps = {
    open: boolean;
    onClose: () => void;
};

const UserModal = ({ onClose: _onClose, open }: UserModalProps) => {
    const utils = api.useContext();

    const { mutateAsync: addUser } = api.users.create.useMutation();

    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors },
        reset,
        trigger,
    } = useForm<User>();

    const onClose = useCallback(() => {
        _onClose();
        reset();
    }, [_onClose, reset]);

    const onSubmit = useCallback(
        async (data: User) => {
            await addUser(data);
            utils.users.all.invalidate();

            onClose();
        },
        [addUser, onClose, utils.users.all]
    );

    return (
        <Dialog {...{ open, onClose }}>
            <DialogTitle>Create User</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container gap={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                size="small"
                                {...register("name", { required: true })}
                                error={Boolean(errors.name)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                size="small"
                                {...register("email", { required: true })}
                                error={Boolean(errors.email)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                name="role"
                                render={() => (
                                    <FormControl fullWidth>
                                        <InputLabel id="role-select-label">Role</InputLabel>
                                        <Select
                                            labelId="role-select-label"
                                            size="small"
                                            label="Role"
                                            error={Boolean(errors.role)}
                                            onChange={(e) => {
                                                setValue("role", e.target.value as string);
                                                trigger();
                                            }}
                                        >
                                            {roles.map((role) => (
                                                <MenuItem key={role.value} value={role.value}>
                                                    {role.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            ></Controller>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserModal;
