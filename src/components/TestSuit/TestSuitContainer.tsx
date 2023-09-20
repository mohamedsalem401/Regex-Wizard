import React from "react";
import { Box } from "@mui/material";
import {
  NumericMatcher,
  StringComparison,
  StringMatcher,
  TestSuit,
  UnitTest,
} from "../../utils/TestSuit";
import { StringMatchCondition } from "./StringMatchCondition";
import { NumericMatchCondition } from "./NumericMatchCondition";
import { TestDescription } from "./TestDescription";
import { AddConditionButton } from "./AddConditionButton";

export function TestSuitContainer({
  testSuit,
  handleTestSuitChange,
  matches,
}: {
  testSuit: TestSuit;
  handleTestSuitChange: (newTestSuid: TestSuit) => void;
  matches: RegExpExecArray[] | null;
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

  const handleTestDescriptionChange = (newDescription: string) => {
    const newTestSuit = testSuit.clone();

    newTestSuit.description = newDescription;
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
      <TestDescription
        description={testSuit.description}
        handleTestDescriptionChange={handleTestDescriptionChange}
        testResult={testSuit.evaluate(matches)}
      />

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
          if (condition instanceof NumericMatcher) {
            return (
              <NumericMatchCondition
                condition={condition}
                matches={matches}
                handleConditionChange={(newCondition: NumericMatcher) => {
                  handleConditionChange(index, newCondition);
                }}
              />
            );
          } else if (condition instanceof StringMatcher) {
            return (
              <StringMatchCondition
                condition={condition}
                matches={matches}
                handleDeleteCondition={() => {
                  handleDeleteCondition(index);
                }}
                handleConditionChange={(newCondition: StringMatcher) => {
                  handleConditionChange(index, newCondition);
                }}
              />
            );
          }
        })}
      </Box>

      <AddConditionButton handleAddCondition={handleAddCondition} />
    </Box>
  );
}
