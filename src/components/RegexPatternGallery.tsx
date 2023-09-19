import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Collapse, Typography } from "@mui/material";
import { KeyboardArrowDown, ChevronRight } from "@mui/icons-material";
import { CopyButton } from "./common/CopyButton";
import "../styles/popular-regex.css";
import { commonRegexes } from "../utils/constants";

type Example = {
  id: number;
  pattern: string;
  regex: string;
  examples: string[];
};

export const RegexPatternGallery: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [commonList, setCommonList] = useState<Example[]>(commonRegexes);
  const searchRegex = (searchTerm: string) => {
    const pattern = new RegExp(`\\b${searchTerm.replace(/ /g, "|")}`, "i");

    const regexes = commonRegexes.filter((reg) =>
      //@ts-ignore
      pattern.test(reg.pattern.trim() || reg.examples || reg.regex)
    );

    setCommonList(regexes);
  };

  return (
    <Box className="popular-regex">
      <Typography
        fontSize="20px"
        mb="10px"
        textAlign="start"
        fontWeight={700}
        className="regex-heading"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? <KeyboardArrowDown /> : <ChevronRight />} Popular Regex
      </Typography>
      <Collapse in={expanded} className="regex-collapse">
        <TextField
          placeholder="Search Regex..."
          onChange={(e) => searchRegex(e.target.value)}
          fullWidth
          size="small"
          className="regex-search"
          type="text"
        />
        {/* popular regex */}
        <Box className="regex-list">
          {commonList.map((item) => (
            <Box key={item.id} className="regex-item">
              <Typography fontWeight={700} className="regex-pattern">
                {item.pattern}
              </Typography>
              <Box className="regex-details">
                <Typography className="regex-regex">
                  /<span className="regex-regex-highlight">{item.regex}</span>/
                </Typography>
                <CopyButton data={item.regex} />
              </Box>
              <Typography
                fontSize="16px"
                color="#000000"
                className="regex-example"
              >
                Example: {item.examples[0]}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};
