import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { initialText } from "../utils/constants";
import { PatternContainer } from "./PatternInput";
import { AddTextStringButton } from "./AddTextStringButton";
import { RegexContainerTabs } from "./RegexContainerTabs";
import { TextStringGroup } from "./TextStringGroup";

export const RegexContainer: React.FC = () => {
  const [regex, setRegex] = useState<RegExp>(/[A-Z]\w+/g);
  const [textStrings, setTextStrings] = useState([initialText]);

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
      <PatternContainer
        regex={regex}
        handleRegexChange={(newRegex) => {
          setRegex(newRegex);
        }}
      />
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
