import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { initialRegexPattern, initialText } from "../data/constants";
import { PatternContainer } from "./PatternInput";
import { RegexHandler } from "./RegexHandler";
import { AddTextStringButton } from "./AddTextStringButton";
import { RegexContainerTabs } from "./RegexContainerTabs";
import { TextStringGroup } from "./TextStringGroup";

export const RegexContainer: React.FC = () => {
  const stringRegex = initialRegexPattern.toString().replace(/^\/|\/.+/g, "");
  const [regex, setRegex] = useState<RegexHandler>(
    new RegexHandler(stringRegex, "g", () => {})
  );
  const [textStrings, setTextStrings] = useState([initialText]);

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
