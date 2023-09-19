import React from "react";
import { Box } from "@mui/material";
import { TextHighlighterTextarea } from "./TextHighlighterTextarea";
import { DeleteButton } from "./DeleteButton";

export function RegexFinderWithDelete({
  regex,
  text,
  handleTextChange,
  handleDelete: handleRegexPatternFinderDelete,
}: {
  regex: RegExp;
  text: string;
  handleTextChange: (newText: string) => void;
  handleDelete: () => void;
}) {
  return (
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
          handleTextChange(newText);
        }}
      />
      <DeleteButton
        onClick={() => {
          handleRegexPatternFinderDelete();
        }}
      />
    </Box>
  );
}
