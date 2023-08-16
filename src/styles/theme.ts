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
            paper: "#EEEDED",
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
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                    padding: 4,
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
};
