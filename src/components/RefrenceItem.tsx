import { Box, Collapse, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HighlightWithinTextarea from "react-highlight-within-textarea";

interface RefrenceItemProps {
  item: {
    title: string;
    description?: string;
    content: string;
    code: string;
    flags: string;
    regexString: string;
  };
}

const RefrenceItem: React.FC<RefrenceItemProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [matches, setMatches] = useState<any>();

  const highlightMatches = () => {
    let regex;
    const flags = item.flags ? item.flags : "g";
    console.log({ flags });
    try {
      regex = new RegExp(item.regexString, "igm");
    } catch (error) {
      regex = new RegExp("^$");
    }

    const matches = [];
    let match;
    while ((match = regex.exec(item.content)) !== null) {
      if (match[0].length === 0) {
        // Break the loop if an empty match is found
        break;
      }
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
      });
    }
    setMatches(matches);
  };

  useEffect(() => highlightMatches(), []);
  return (
    <Box mb="10px">
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          cursor: "pointer",
          mb: "10px",
        }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 8px",
            borderRadius: "4px",
            background: "#777",
            lineHeight: "normal",
            color: "#fff",
            fontSize: "12px",
          }}
        >
          {item.code}
        </span>
        <p
          style={{
            fontSize: "16px",
            color: "#444",
            fontWeight: "semi-bold",
          }}
        >
          {item.title}
        </p>
        {expanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none" 
          >
            <path
              d="M6 0.294922L0 6.29492L1.41 7.70492L6 3.12492L10.59 7.70492L12 6.29492L6 0.294922Z"
              fill="black"
              fill-opacity="0.56"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path
              d="M6 7.70508L12 1.70508L10.59 0.295078L6 4.87508L1.41 0.295078L0 1.70508L6 7.70508Z"
              fill="black"
              fill-opacity="0.56"
            />
          </svg>
        )}
      </Typography>

      <Collapse in={expanded}>
        <Typography variant="subtitle2" mb="10px">
          {item.description}
        </Typography>
        <Box
          p="8px 10px"
          bgcolor="#313131"
          borderRadius="6px"
          overflow="hidden"
          mb="10px"
        >
          <HighlightWithinTextarea
            value={item.content}
            highlight={matches?.map((match: { start: any; end: any }) => ({
              highlight: [match.start, match.end],
              className: "highlighted",
            }))}
          />
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            p: "8px 10px",
            bgcolor: "#313131",
            borderRadius: "6px",
            overflow: "hidden",
            color: "#e8f9ee",
            mb: "10px",
          }}
        >
          /
          <span
            style={{
              color: "#5ff59b",
            }}
          >
            {item.regexString}
          </span>
          /{" "}
          <span
            style={{
              color: "#5ff59b",
            }}
          >
            {item.flags}
          </span>
        </Typography>
      </Collapse>
    </Box>
  );
};

export default RefrenceItem;
