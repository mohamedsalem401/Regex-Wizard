import React from "react";
import { Box } from "@mui/material";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";

type DisplayMatchesProps = {
  text: string;
  matches: { start: number; end: number; }[];
  setText: (value: string) => void;
};
export const TextHighlighterTextarea: React.FC<DisplayMatchesProps> = ({
  text, matches, setText,
}) => {
  return (
    <Box
      sx={{
        p: "10px",
        borderRadius: "6px",
        bgcolor: "#313131",
        mb: "30px",
        textAlign: "start",
        height: "100%",
      }}
    >
      <HighlightWithinTextarea
        value={text}
        highlight={matches.map((match) => ({
          highlight: [match.start, match.end],
          className: "green",
        }))}
        onChange={(value) => setText(value)} />
    </Box>
  );
};
