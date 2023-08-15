import { type ThemeOptions } from "@mui/material";

export const ChatsTheme: ThemeOptions = {
    palette: {
        primary: {
            main: "#102C57",
        },
        secondary: {
            main: "#DAC0A3",
        },
        background: {
            paper: "#F1F0E8",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
};
