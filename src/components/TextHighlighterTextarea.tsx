import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";
import { findMatchesInText } from "../utils/helpers";

type DisplayMatchesProps = {
  regex: RegExp;
  text: string;
  handleTextChange: (value: string) => void;
};

export const TextHighlighterTextarea: React.FC<DisplayMatchesProps> = ({
  regex,
  text,
  handleTextChange,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    (ref.current as unknown as HTMLInputElement).focus();
  }, []);

  return (
    <Box
      sx={{
        p: "10px",
        borderRadius: "6px",
        bgcolor: "#313131",
        textAlign: "start",
        height: "100%",
        alignSelf: "stretch",
        width: "100%",
      }}
    >
      <HighlightWithinTextarea
        ref={ref}
        placeholder="Enter the text you want to match here"
        value={text}
        highlight={findMatchesInText(regex, text).map((match) => ({
          highlight: [match.start, match.end],
          className: "highlighted",
        }))}
        onChange={(value) => handleTextChange(value)}
      />
    </Box>
  );
};
