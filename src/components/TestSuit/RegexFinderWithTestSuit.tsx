import React, { useState } from "react";
import { Box } from "@mui/material";
import { PatternInvestigator } from "../../utils/PatternInvestigator";
import { RegexFinderWithDelete } from "../RegexFinderWithDelete";
import {
  NumericMatcher,
  NumericComparison,
  StringComparison,
  StringMatcher,
  TestSuit,
} from "../../utils/TestSuit";
import { TestSuitContainer } from "./TestSuitContainer";

export function RegexFinderWithTestSuit({
  regex,
  regexPatternFinder,
  handleTextChange,
  handleDelete: handleDelete,
}: {
  regex: RegExp;
  regexPatternFinder: PatternInvestigator;
  handleTextChange: (newText: string) => void;
  handleDelete: () => void;
}) {
  const matches = [];
  let match;

  while ((match = regex.exec(regexPatternFinder.text)) !== null) {
    matches.push(match);
  }
  console.log(matches);
  const [testSuit, setTestSuit] = useState(
    new TestSuit("Test suit", [
      new NumericMatcher(NumericComparison.MoreThan, 0),
      new StringMatcher(StringComparison.Contains, "", 0),
      new StringMatcher(StringComparison.Contains, "", 0),
    ])
  );

  const handleTestSuitChange = (newTestSuit: TestSuit) => {
    setTestSuit(newTestSuit);
  };

  return (
    <Box
      style={{
        display: "flex",
        padding: "var(--2, 16px) var(--none, 0px)",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--4, 16px)",
        alignSelf: "stretch",
        borderBottom: "2px solid black",
      }}
    >
      <RegexFinderWithDelete
        regex={regex}
        text={regexPatternFinder.text}
        handleTextChange={(newText: string) => {
          handleTextChange(newText);
        }}
        handleDelete={handleDelete}
      />

      {/* TestSuit */}
      <TestSuitContainer
        matches={matches}
        testSuit={testSuit}
        handleTestSuitChange={handleTestSuitChange}
      />
    </Box>
  );
}
