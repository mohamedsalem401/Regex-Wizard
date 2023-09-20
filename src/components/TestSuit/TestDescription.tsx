import React from "react";
import { Box, TextField } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { TestSuitIcon } from "./TestSuitIcon";

export function TestDescription() {
  const testResult = false;
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        alignSelf: "stretch",
      }}
    >
      <TestSuitIcon testResult={testResult}/>
      <TextField label="Test description" variant="standard" fullWidth />
    </Box>
  );
}
