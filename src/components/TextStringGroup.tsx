import React, { useCallback } from "react";
import { Box } from "@mui/material";
import { TextHighlighterTextarea } from "./common/TextHighlighterTextarea";
import { RegexHandler } from "./RegexHandler";
import { DeleteButton } from "./DeleteButton";

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
              <TextHighlighterTextarea
                regex={regex}
                text={text}
                handleTextChange={(newText) => {
                  handleTextChangeCallback(index, newText);
                }}
                key={index}
              />
            )}
            {currentTab === "SUBTITUTION" && (
              <Box>
                <TextHighlighterTextarea
                  regex={regex}
                  text={text}
                  handleTextChange={(newText) => {
                    handleTextChangeCallback(index, newText);
                  }}
                  key={index}
                />
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
            <DeleteButton
              onClick={() => {
                handleTextStringDelete(index);
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
