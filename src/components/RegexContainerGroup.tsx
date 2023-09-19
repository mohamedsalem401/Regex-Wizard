import React, { useState } from "react";
import { Box } from "@mui/material";
import { AddRegexContainerButton } from "./AddRegexContainerButton";
import { RegexContainer } from "./RegexContainer";

export type Match = {
  start: number;
  end: number;
};

export const RegexContainerGroup: React.FC = ({}) => {
  const [regexesContainers, setRegexesContainers] = useState([0, 0, 0]);

  const handleAddRegexContainer = () => {
    const newRegexesContainers = [...regexesContainers, 0];
    setRegexesContainers(newRegexesContainers);
  };

  return (
    <Box
      style={{
        display: "flex",
        padding: "var(--2, 16px) var(--none, 0px)",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "var(--2, 16px)",
      }}
    >
      {regexesContainers.map((regexContainer) => (
        <RegexContainer />
      ))}
      <AddRegexContainerButton onClick={handleAddRegexContainer} />
    </Box>
  );
};
