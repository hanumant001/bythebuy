"use client"
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#111827", // dark
    // },
    secondary: {
      main: "#f97316", // orange
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;