import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { NumericMatcher, NumericComparison } from "../../utils/TestSuit";
import { TestUnitIcon } from "./TestUnitIcon";

export function NumericMatchCondition({
  condition,
  handleConditionChange,
  matches,
}: {
  condition: NumericMatcher;
  handleConditionChange: (newCondition: NumericMatcher) => void;
  matches: RegExpExecArray[] | null;
}) {
  const handleOperationChange = (newOperation: NumericComparison) => {
    const newCondition = condition.clone();
    newCondition.operation = newOperation;

    handleConditionChange(newCondition);
  };

  const handleValueChange = (newValue: number) => {
    const newCondition = condition.clone();
    newCondition.value = newValue;

    handleConditionChange(newCondition);
  };

  const getTestResult = () => {
    return condition.evaluate(matches);
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
      <TestUnitIcon testResult={getTestResult()} />
      <Typography variant="h6">Match</Typography>
      <FormControl variant="standard">
        <InputLabel id="select-label">Type</InputLabel>
        <Select
          label="TYPE"
          value={condition.operation}
          onChange={(e) => {
            handleOperationChange(
              e.target.value as unknown as NumericComparison
            );
          }}
          labelId="select-label"
          id="select-demo"
          autoWidth
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
        value={condition.value}
        onChange={(e) => {
          handleValueChange(e.target.value as unknown as number);
        }}
        variant="standard"
        type="number"
        inputProps={{ min: 0 }}
        style={{
          maxWidth: "50px",
        }}
      />
      <Typography variant="h6">times</Typography>
    </Box>
  );
}
