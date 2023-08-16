import { type PaletteColor, type PaletteColorOptions, type ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
    interface PaletteOptions {
        yellow: PaletteColorOptions;
    }
    interface Palette {
        yellow: PaletteColor;
    }
}

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
        yellow: {
            main: "#F8DE22",
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
