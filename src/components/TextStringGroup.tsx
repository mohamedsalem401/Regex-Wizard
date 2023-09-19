import React, { useCallback } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { TextHighlighterTextarea } from "./TextHighlighterTextarea";
import { DeleteButton } from "./DeleteButton";
import { ContentCopy } from "@mui/icons-material";
import { copyToClipboard } from "../utils/helpers";
import { PatternInvestigator } from "../utils/PatternInvestigator";

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
    const newPatternInvestigatorCollectionChange = [
      ...patternInvestigatorCollection,
    ];
    const newRegexPatternFinder = patternInvestigatorCollection[index].clone();
    newRegexPatternFinder.text = newText;
    newPatternInvestigatorCollectionChange[index] = newRegexPatternFinder;
    handlePatternInvestigatorCollectionChange(
      newPatternInvestigatorCollectionChange
    );
  };

  const handleRegexPatternFinderDelete = (index: number) => {
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

  const handleSubtitutionChange = (index: number, newSubtitution: string) => {
    const newPatternInvestigatorCollectionChange = [
      ...patternInvestigatorCollection,
    ];
    const newRegexPatternFinder = patternInvestigatorCollection[index].clone();
    newRegexPatternFinder.subtitution = newSubtitution;
    newPatternInvestigatorCollectionChange[index] = newRegexPatternFinder;
    handlePatternInvestigatorCollectionChange(
      newPatternInvestigatorCollectionChange
    );
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
                <TextHighlighterTextarea
                  regex={regex}
                  text={regexPatternFinder.text}
                  handleTextChange={(newText) => {
                    handleTextChangeCallback(index, newText);
                  }}
                  key={index}
                />
              </Box>
            )}
            {currentTab === "SUBTITUTION" && (
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
                <Box
                  style={{
                    display: "flex",
                    padding: "var(--none, 0px)",
                    alignItems: "center",
                    gap: "var(--2, 16px)",
                    alignSelf: "stretch",
                  }}
                >
                  <TextHighlighterTextarea
                    regex={regex}
                    text={regexPatternFinder.text}
                    handleTextChange={(newText) => {
                      handleTextChangeCallback(index, newText);
                    }}
                    key={index}
                  />
                  <DeleteButton
                    onClick={() => {
                      handleRegexPatternFinderDelete(index);
                    }}
                  />
                </Box>

                <TextField
                  label="SUBTITUTION"
                  variant="standard"
                  style={{
                    alignSelf: "stretch",
                  }}
                  value={regexPatternFinder.subtitution}
                  onChange={(e) => {
                    handleSubtitutionChangeCallback(index, e.target.value);
                  }}
                />

                <TextField
                  label="OUTPUT"
                  variant="standard"
                  disabled
                  style={{
                    padding: "var(--none, 0px)",
                    gap: "var(--none, 0px)",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                  }}
                  multiline
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            copyToClipboard(
                              regexPatternFinder.getSubtitutionOutput()
                            );
                          }}
                        >
                          <ContentCopy />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={regexPatternFinder.getSubtitutionOutput()}
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
