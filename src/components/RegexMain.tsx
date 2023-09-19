import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { initialRegexPattern, initialText } from "../data/constants";
import { PatternContainer } from "./PatternInput";
import { RegexHandler } from "./RegexHandler";
import { AddTextStringButton } from "./AddTextStringButton";
import { RegexContainerTabs } from "./RegexContainerTabs";
import { AddRegexContainerButton } from "./AddRegexContainerButton";
import { TextStringGroup } from "./TextStringGroup";

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

const RegexContainer: React.FC = () => {
  const stringRegex = initialRegexPattern.toString().replace(/^\/|\/.+/g, "");
  const [regex, setRegex] = useState<RegexHandler>(
    new RegexHandler(stringRegex, "g", () => {})
  );
  const [textStrings, setTextStrings] = useState([initialText, initialText]);

  useEffect(() => {
    setRegex(new RegexHandler(stringRegex, "g", setRegex));
  }, []);

  const handleAddTextString = () => {
    const newTextStrings = [...textStrings, ""];
    setTextStrings(newTextStrings);
  };

  const [currentTab, setCurrentTab] = useState("MATCH");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
        gap: "8px",
        paddingBottom: "48px",
        borderBottom: "1px dashed #000",
      }}
    >
      <RegexContainerTabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <PatternContainer regex={regex} />
      <TextStringGroup
        textStrings={textStrings}
        handleTextStringsArrChange={(newTextStrings) => {
          setTextStrings(newTextStrings);
        }}
        regex={regex}
        currentTab={currentTab}
      />
      <AddTextStringButton handleAddTextString={handleAddTextString} />
    </Box>
  );
};
export default RegexContainer;
