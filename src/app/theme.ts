"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        gradient: {
            main: string;
        };
        gray: {
            main: string;
        };
    }
    interface PaletteOptions {
        gradient?: {
            main?: string;
        };
        gray?: {
            main?: string;
        };
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#542DC0",
        },
        gradient: {
            main: "linear-gradient(to left bottom, #502db3, #532dbf, #562ecb, #5a2ed7, #5d2ee3);",
        },
        gray: {
            main: "#7D8DA6",
        },
        background: {
            default: "#fff",
        },
    },
    typography: {
        fontFamily: "var(--font-chivo)",
    },
    cssVariables: true,
});

export default theme;
