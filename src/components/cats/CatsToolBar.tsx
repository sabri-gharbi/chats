import { FilterAlt, Sort } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { SortFieldsOption, type FilterCatsFields, type SortCatsFields } from "~/pages/cats";
import { CatsAppContext } from "../layout";

type CatsToolBarFilter = {
    sortField?: SortCatsFields;
    setSortField: (fields?: SortCatsFields) => void;
    filter?: FilterCatsFields;
    setFilter: (fields?: FilterCatsFields) => void;
};

const CatsToolBar = ({ filter, setFilter, sortField, setSortField }: CatsToolBarFilter) => {
    return (
        <Box display="flex" justifyContent="end" marginBottom={1}>
            <SortMenu {...{ sortField, setSortField }} />
            <FilterMenu {...{ setFilter, filter }} />
        </Box>
    );
};

type SortMenuProps = {
    sortField?: SortCatsFields;
    setSortField: (fields?: SortCatsFields) => void;
};

const SortMenu = ({ sortField, setSortField }: SortMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { user } = useContext(CatsAppContext);

    return (
        <>
            <IconButton onClick={handleClick}>
                <Sort />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{}}>
                {SortFieldsOption.map(({ label, value }) => (
                    <MenuItem
                        key={value}
                        onClick={() => {
                            if (sortField === value) {
                                setSortField(undefined);
                            } else {
                                setSortField(value);
                            }
                            handleClose();
                        }}
                        disableRipple
                        selected={sortField === value}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

type FilterMenuProps = {
    filter?: FilterCatsFields;
    setFilter: (fields?: FilterCatsFields) => void;
};

const FilterMenu = ({ setFilter, filter }: FilterMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { user } = useContext(CatsAppContext);

    return (
        <>
            <IconButton onClick={handleClick}>
                <FilterAlt />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{}}>
                <MenuItem
                    onClick={() => {
                        if (filter?.catLover) {
                            setFilter(undefined);
                        } else if (user) {
                            setFilter({
                                catLover: user.id,
                            });
                        }
                        handleClose();
                    }}
                    disableRipple
                    selected={Boolean(filter?.catLover === user?.id)}
                    disabled={user?.role === "admin"}
                >
                    Favorit
                </MenuItem>
            </Menu>
        </>
    );
};

export default CatsToolBar;
