import React from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { copyToClipboard } from "../utils/helpers";
import { PatternInvestigator } from "../utils/PatternInvestigator";
import { RegexFinderWithDelete } from "./RegexFinderWithDelete";

export function RegexFinderWithSubtitution({
  regex, regexPatternFinder, handleSubtitutionChange, handleTextChange, handleDelete: handleDelete,
}: {
  regex: RegExp;
  regexPatternFinder: PatternInvestigator;
  handleSubtitutionChange: (newSubtitution: string) => void;
  handleTextChange: (newText: string) => void;
  handleDelete: () => void;
}) {
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
        handleDelete={handleDelete} />

      <TextField
        label="SUBTITUTION"
        variant="standard"
        style={{
          alignSelf: "stretch",
        }}
        value={regexPatternFinder.subtitution}
        onChange={(e) => {
          handleSubtitutionChange(e.target.value);
        }} />

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
                  copyToClipboard(regexPatternFinder.getSubtitutionOutput());
                }}
              >
                <ContentCopy />
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={regexPatternFinder.getSubtitutionOutput()} />
    </Box>
  );
}
