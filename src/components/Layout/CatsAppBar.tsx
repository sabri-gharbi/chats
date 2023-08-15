import { Menu } from "@mui/icons-material";
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React from "react";

const CatsAppBar = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <Menu />
                </IconButton>
                <Link href="/">
                    <Typography variant="h6" color="white">
                        Cats
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default CatsAppBar;
