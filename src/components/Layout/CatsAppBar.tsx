import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { type User } from "~/Types";

type CatsAppBarProps = {
    user?: User;
};
const CatsAppBar = ({ user }: CatsAppBarProps) => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width={"100%"}>
                    <Link
                        href="/"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <Typography variant="h6" color="white">
                            Cats
                        </Typography>
                    </Link>

                    <Typography>{user ? user.email : "Guest"}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default CatsAppBar;
