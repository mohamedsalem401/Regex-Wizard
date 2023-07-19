import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TextHighlighterTextarea } from "./common/TextHighlighterTextarea";
import { initialRegexPattern, initialText } from "../data/constants";
import { PatternInput } from "./PatternInput";
import { RegexHandler } from "./RegexHandler";

export type Match = {
  start: number;
  end: number;
};

const RegexMain: React.FC = () => {
  const stringRegex = initialRegexPattern.toString().replace(/^\/|\/.+/g, "");
  const [text, setText] = useState(initialText);
  const [regex, setRegex] = useState<RegexHandler>(
    new RegexHandler(stringRegex, "g", () => {})
  );

  useEffect(() => {
    setRegex(new RegexHandler(stringRegex, "g", setRegex));
  }, []);

  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    highlightMatches();
  }, [text, regex]);

  const highlightMatches = () => {
    const newMatches: Match[] = regex.getMatches(text);
    setMatches(newMatches);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <PatternInput regex={regex} />
      <TextHighlighterTextarea
        text={text}
        matches={matches}
        setText={setText}
      />
    </Box>
  );
};
export default RegexMain;
