import { Typography } from "@mui/material";
import React from "react";
import { type Cat } from "~/Types";

type CatStatusProps = {
    status: Cat["adoptionStatus"];
};

type statusStringIds = "isAdoptable" | "isAdopted" | "isPending";
const StatusColors: Record<statusStringIds, string> = {
    isAdopted: "success",
    isPending: "warning",
    isAdoptable: "info",
};

const CatSatus = ({ status }: CatStatusProps) => {
    return (
        <Typography
            variant="subtitle2"
            sx={{
                color: "white",
                bgcolor: `${StatusColors[status.id as statusStringIds]}.light`,
                paddingY: 0.5,
                paddingX: 1,
                borderRadius: 2,
                width: "fit-content",
                height: "fit-content",
            }}
        >
            {status.isAdoptable && "Adoptable"}
            {status.isAdopted && "Adopted"}
            {status.isPending && "Pending"}
        </Typography>
    );
};

export default CatSatus;
