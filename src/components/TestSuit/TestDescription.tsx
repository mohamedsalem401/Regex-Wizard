import React from "react";
import { Box, TextField } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

export function TestDescription() {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        alignSelf: "stretch",
      }}
    >
      <CheckCircle
        style={{
          fill: "#2E7D32",
        }} />
      <TextField label="Test description" variant="standard" fullWidth />
    </Box>
  );
}
