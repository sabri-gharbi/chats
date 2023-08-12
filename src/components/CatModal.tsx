import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { type Cat } from "~/Types";

type CatModalProps = {
  cat: Cat;
  open: boolean;
  onClose: () => void;
};
const CatModal = ({ onClose, open, cat }: CatModalProps) => {
  return (
    <Dialog {...{ open, onClose }}>
      <DialogTitle>{cat.name}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default CatModal;
