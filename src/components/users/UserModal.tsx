import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { type User } from "~/Types";
import { api } from "~/utils/api";

export type UserModalProps = {
    open: boolean;
    onClose: () => void;
};

const UserModal = ({ onClose, open }: UserModalProps) => {
    const utils = api.useContext();

    const { mutateAsync: addUser } = api.users.create.useMutation();

    const { handleSubmit, register, control } = useForm<User>();

    const onSubmit = useCallback(
        async (data: User) => {
            await addUser(data);
            await utils.users.all.invalidate();
            onClose();
        },
        [addUser, onClose, utils.users.all]
    );

    return (
        <Dialog {...{ open, onClose }}>
            <DialogTitle>Create User</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <TextField label="Name" {...register("name")} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="Email" {...register("email")} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="Role" {...register("role")} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserModal;
