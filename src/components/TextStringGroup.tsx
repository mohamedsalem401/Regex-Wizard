import React, { useCallback } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { TextHighlighterTextarea } from "./common/TextHighlighterTextarea";
import { RegexHandler } from "./RegexHandler";
import { DeleteButton } from "./DeleteButton";
import { ContentCopy } from "@mui/icons-material";
import { copyToClipboard } from "./helpers";

export function TextStringGroup({
  textStrings,
  regex,
  handleTextStringsArrChange,
  currentTab,
}: {
  textStrings: string[];
  regex: RegexHandler;
  handleTextStringsArrChange: (newTextStrings: string[]) => void;
  currentTab: string;
}) {
  const handleTextStringChange = (index: number, newText: string) => {
    const newTextStrings = [...textStrings];
    newTextStrings[index] = newText;
    handleTextStringsArrChange(newTextStrings);
  };

  const handleTextStringDelete = (index: number) => {
    const newTextStrings = textStrings.filter((_, i) => i !== index);
    handleTextStringsArrChange(newTextStrings);
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
    textStrings[0],
    regex.regex,
    subtitutionText
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
      {textStrings.map((text, index) => {
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
                  text={text}
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
                    text={text}
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
