import React, { useCallback } from "react";
import { Box } from "@mui/material";
import { PatternInvestigator } from "../utils/PatternInvestigator";
import { RegexFinderWithDelete } from "./RegexFinderWithDelete";
import { RegexFinderWithSubtitution } from "./RegexFinderWithSubtitution";
import { Delete } from "@mui/icons-material";
import { RegexFinderWithTestSuit } from "./TestSuit/RegexFinderWithTestSuit";

export function TextStringGroup({
  patternInvestigatorCollection,
  regex,
  handlePatternInvestigatorCollectionChange,
  currentTab,
}: {
  patternInvestigatorCollection: PatternInvestigator[];
  regex: RegExp;
  handlePatternInvestigatorCollectionChange: (
    newPatternInvestigatorCollectionChange: PatternInvestigator[]
  ) => void;
  currentTab: string;
}) {
  const handleTextChange = (index: number, newText: string) => {
    const newRegexPatternFinder = patternInvestigatorCollection[index].clone();
    newRegexPatternFinder.text = newText;
    handlePatternInvestigatorChange(index, newRegexPatternFinder);
  };

  const handleDelete = (index: number) => {
    const newPatternInvestigatorCollectionChange =
      patternInvestigatorCollection.filter((_, i) => i !== index);
    handlePatternInvestigatorCollectionChange(
      newPatternInvestigatorCollectionChange
    );
  };

  const handleTextChangeCallback = useCallback(
    (index: number, newText: string) => {
      handleTextChange(index, newText);
    },
    [handleTextChange]
  );

  const handlePatternInvestigatorChange = (
    index: number,
    newPatternInvestigator: PatternInvestigator
  ) => {
    const newPatternInvestigatorCollectionChange = [
      ...patternInvestigatorCollection,
    ];
    newPatternInvestigatorCollectionChange[index] = newPatternInvestigator;
    handlePatternInvestigatorCollectionChange(
      newPatternInvestigatorCollectionChange
    );
  };

  const handleSubtitutionChange = (index: number, newSubtitution: string) => {
    const newRegexPatternFinder = patternInvestigatorCollection[index].clone();
    newRegexPatternFinder.subtitution = newSubtitution;
    handlePatternInvestigatorChange(index, newRegexPatternFinder);
  };

  const handleSubtitutionChangeCallback = useCallback(
    (index: number, newSubtitution: string) => {
      handleSubtitutionChange(index, newSubtitution);
    },
    [handleSubtitutionChange]
  );

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: "8px",
      }}
    >
      {patternInvestigatorCollection.map((regexPatternFinder, index) => {
        return (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            {currentTab === "MATCH" && (
              <Box>
                <RegexFinderWithDelete
                  regex={regex}
                  text={regexPatternFinder.text}
                  handleTextChange={(newText: string) => {
                    handleTextChangeCallback(index, newText);
                  }}
                  handleDelete={() => {
                    handleDelete(index);
                  }}
                />
              </Box>
            )}
            {currentTab === "SUBTITUTION" && (
              <RegexFinderWithSubtitution
                regex={regex}
                regexPatternFinder={regexPatternFinder}
                handleDelete={() => {
                  handleDelete(index);
                }}
                handleTextChange={(newText) => {
                  handleTextChangeCallback(index, newText);
                }}
                handleSubtitutionChange={(newSubtitution: string) => {
                  handleSubtitutionChangeCallback(index, newSubtitution);
                }}
              />
            )}
            {currentTab === "UNIT TESTS" && (
              <RegexFinderWithTestSuit
                regex={regex}
                regexPatternFinder={regexPatternFinder}
                handleDelete={() => {
                  handleDelete(index);
                }}
                handleTextChange={(newText) => {
                  handleTextChangeCallback(index, newText);
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}
