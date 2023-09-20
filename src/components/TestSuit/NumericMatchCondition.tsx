import React from "react";
import {
  Box, FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {
  CountingMatcher,
  NumericComparison
} from "../../utils/TestSuit";

export function NumericMatchCondition({
  handleConditionChange,
}: {
  handleConditionChange: (newCondition: CountingMatcher) => void;
}) {
  return (
    <Box
      style={{
        display: "flex",
        paddingBottom: "var(--2, 16px)",
        alignItems: "center",
        gap: "var(--1, 16px)",
        alignSelf: "stretch",
        borderBottom: "1px solid #000",
      }}
    >
      <CheckCircle
        style={{
          fill: "#2E7D32",
        }} />
      <Typography variant="h6">Match</Typography>
      <FormControl variant="standard">
        <InputLabel id="select-label">Type</InputLabel>
        <Select
          labelId="select-label"
          id="select-demo"
          value={NumericComparison.MoreThan}
          autoWidth
          label="TYPE"
        >
          <MenuItem value={NumericComparison.MoreThan}>
            {NumericComparison.MoreThan}
          </MenuItem>
          <MenuItem value={NumericComparison.Equal}>
            {NumericComparison.Equal}
          </MenuItem>
          <MenuItem value={NumericComparison.LessThan}>
            {NumericComparison.LessThan}
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Count"
        variant="standard"
        type="number"
        inputProps={{ min: 0 }}
        style={{
          maxWidth: "50px",
        }} />
      <Typography variant="h6">times</Typography>
    </Box>
  );
}
