import React from "react";
import { Box } from "@mui/material";
import {
  CountingMatcher, StringComparison,
  StringMatcher,
  TestSuit,
  UnitTest
} from "../../utils/TestSuit";
import { StringMatchCondition } from "./StringMatchCondition";
import { NumericMatchCondition } from "./NumericMatchCondition";
import { TestDescription } from "./TestDescription";
import { AddConditionButton } from "./AddConditionButton";

export function TestSuitContainer({
  testSuit, handleTestSuitChange,
}: {
  testSuit: TestSuit;
  handleTestSuitChange: (newTestSuid: TestSuit) => void;
}) {
  const handleAddCondition = () => {
    const newTestSuit = testSuit.clone();
    newTestSuit.unitTests.push(
      new StringMatcher(StringComparison.Contains, "", 0)
    );
    handleTestSuitChange(newTestSuit);
  };

  const handleDeleteCondition = (index: number) => {
    const newTestSuit = testSuit.clone();

    newTestSuit.unitTests.splice(index, 1);
    handleTestSuitChange(newTestSuit);
  };

  const handleConditionChange = (index: number, newCondition: UnitTest) => {
    const newTestSuit = testSuit.clone();

    newTestSuit.unitTests[index] = newCondition;
    handleTestSuitChange(newTestSuit);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "15px",
        alignSelf: "stretch",
      }}
    >
      <TestDescription />

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--2, 16px)",
          alignSelf: "stretch",
        }}
      >
        {testSuit.unitTests.map((condition, index) => {
          if (condition instanceof CountingMatcher) {
            return (
              <NumericMatchCondition
                handleConditionChange={(newCondition: CountingMatcher) => {
                  handleConditionChange(index, newCondition);
                }} />
            );
          } else if (condition instanceof StringMatcher) {
            return (
              <StringMatchCondition
                condition={condition}
                handleDeleteCondition={() => {
                  handleDeleteCondition(index);
                }}
                handleConditionChange={(newCondition: StringMatcher) => {
                  handleConditionChange(index, newCondition);
                }} />
            );
          }
        })}
      </Box>

      <AddConditionButton handleAddCondition={handleAddCondition} />
    </Box>
  );
}
