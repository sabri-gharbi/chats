import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

export type CatMenuProps = {
    icon: React.ReactNode;
    options?: string[];
    onClick?: () => void;
};

export const CatsToolBarMenu = ({ icon }: CatMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>{icon}</IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <FileCopyIcon />
                    Duplicate
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                    <ArchiveIcon />
                    Archive
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <MoreHorizIcon />
                    More
                </MenuItem>
            </Menu>
        </>
    );
};
