import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { type Cat } from "~/Types";
import { api } from "~/utils/api";

type CatModalProps = {
    cat: Cat;
    open: boolean;
    onClose: () => void;
};
const CatModal = ({ onClose, open, cat }: CatModalProps) => {
    const { mutate: addCat } = api.cats.create.useMutation();
    const { mutate: updateCat } = api.cats.edit.useMutation();

    return (
        <Dialog {...{ open, onClose }}>
            <DialogTitle>{cat.name}</DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
};

export default CatModal;
