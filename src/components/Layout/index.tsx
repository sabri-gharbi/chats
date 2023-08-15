import { Box } from "@mui/material";
import React, { createContext, useState, type PropsWithChildren } from "react";
import CatsAppBar from "./CatsAppBar";
import { type User } from "~/Types";

export const CatsAppContext = createContext<{ user?: User; setUser?: (user: User) => void }>({});

export type LayoutProps = {};
const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
    const [user, setUser] = useState<User>();

    return (
        <Box>
            <CatsAppBar user={user} />
            <CatsAppContext.Provider
                value={{
                    user,
                    setUser,
                }}
            >
                {children}
            </CatsAppContext.Provider>
        </Box>
    );
};

export default Layout;
