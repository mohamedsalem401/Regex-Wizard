import React, { useCallback } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { TextHighlighterTextarea } from "./TextHighlighterTextarea";
import { DeleteButton } from "./DeleteButton";
import { ContentCopy } from "@mui/icons-material";
import { copyToClipboard } from "../utils/helpers";
import { RegexPatternFinder } from "../utils/RegexPatternFinder";

export function TextStringGroup({
  regexPatternFinderCollection,
  regex,
  handleRegexPatternFinderCollectionChange: handleRegexPatternFinderCollection,
  currentTab,
}: {
  regexPatternFinderCollection: RegexPatternFinder[];
  regex: RegExp;
  handleRegexPatternFinderCollectionChange: (
    newRegexPatternFinderCollection: RegexPatternFinder[]
  ) => void;
  currentTab: string;
}) {
  const handleTextStringChange = (index: number, newText: string) => {
    const newRegexPatternFinderCollection = [...regexPatternFinderCollection];
    const newRegexPatternFinder = regexPatternFinderCollection[index].clone();
    newRegexPatternFinder.text = newText;
    newRegexPatternFinderCollection[index] = newRegexPatternFinder;
    handleRegexPatternFinderCollection(newRegexPatternFinderCollection);
  };

  const handleTextStringDelete = (index: number) => {
    const newTextStrings = regexPatternFinderCollection.filter(
      (_, i) => i !== index
    );
    handleRegexPatternFinderCollection(newTextStrings);
  };

  const handleTextChangeCallback = useCallback(
    (index: number, newText: string) => {
      handleTextStringChange(index, newText);
    },
    []
  );

  const getSubtitutionOutputValue = (
    textString: string,
    regex: RegExp,
    subtitutionText: string
  ) => {
    return textString.replace(regex, subtitutionText);
  };

  const subtitutionText = "123";
  const subtitutionOutputValue = getSubtitutionOutputValue(
    regexPatternFinderCollection[0].text,
    regex,
    regexPatternFinderCollection[0].subtitution
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
      {regexPatternFinderCollection.map((regexPatternFinder, index) => {
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
                      handleTextStringDelete(index);
                    }}
                  />
                </Box>

                <TextField
                  label="SUBTITUTION"
                  variant="standard"
                  style={{
                    alignSelf: "stretch",
                  }}
                  value={subtitutionText}
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
                            copyToClipboard(subtitutionOutputValue);
                          }}
                        >
                          <ContentCopy />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={subtitutionOutputValue}
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
