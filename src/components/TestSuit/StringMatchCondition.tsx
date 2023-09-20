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
import { DeleteButton } from "../DeleteButton";
import {
  StringComparison,
  StringMatcher
} from "../../utils/TestSuit";

export function StringMatchCondition({
  condition, handleDeleteCondition, handleConditionChange,
}: {
  condition: StringMatcher;
  handleDeleteCondition: () => void;
  handleConditionChange: (newCondition: StringMatcher) => void;
}) {
  const handleIndexChange = (newIndex: number) => {
    const newCondition = condition.clone();
    newCondition.index = newIndex;

    handleConditionChange(newCondition);
  };

  const handleOperationChange = (newOperation: StringComparison) => {
    const newCondition = condition.clone();
    newCondition.operation = newOperation;

    handleConditionChange(newCondition);
  };

  const handleStringChange = (newString: string) => {
    const newCondition = condition.clone();
    newCondition.string = newString;

    handleConditionChange(newCondition);
  };

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
      <Typography variant="h6">Match number</Typography>
      <TextField
        label="No"
        value={condition.index}
        onChange={(e) => {
          handleIndexChange(e.target.value as unknown as number);
        }}
        variant="standard"
        type="number"
        inputProps={{ min: 0 }}
        style={{
          maxWidth: "50px",
        }} />
      <Typography variant="h6">will</Typography>
      <FormControl variant="standard">
        <InputLabel id="select-label">Type</InputLabel>
        <Select
          labelId="select-label"
          value={condition.operation}
          onChange={(e) => {
            handleOperationChange(
              e.target.value as unknown as StringComparison
            );
          }}
          id="select-demo"
          autoWidth
          label="TYPE"
          style={{
            minWidth: "120px",
          }}
        >
          <MenuItem value={StringComparison.StartsWith}>
            {StringComparison.StartsWith}
          </MenuItem>
          <MenuItem value={StringComparison.EndsWith}>
            {StringComparison.EndsWith}
          </MenuItem>
          <MenuItem value={StringComparison.Contains}>
            {StringComparison.Contains}
          </MenuItem>
          <MenuItem value={StringComparison.DoesNotContain}>
            {StringComparison.DoesNotContain}
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="String or Regex"
        value={condition.string}
        onChange={(e) => {
          handleStringChange(e.target.value);
        }}
        variant="standard"
        style={{
          alignSelf: "stretch",
        }} />
      <DeleteButton onClick={handleDeleteCondition} />
    </Box>
  );
}
