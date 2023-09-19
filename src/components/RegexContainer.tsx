import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { initialText } from "../utils/constants";
import { PatternContainer } from "./PatternInput";
import { AddTextStringButton } from "./AddTextStringButton";
import { RegexContainerTabs } from "./RegexContainerTabs";
import { TextStringGroup } from "./TextStringGroup";
import { PatternInvestigator } from "../utils/PatternInvestigator";
import { TestSuit } from "../utils/TestSuit";
import { initialRegex } from "../utils/constants";

const patternInvestigator = new PatternInvestigator(
  initialText,
  initialRegex,
  "",
  new TestSuit()
);

export const RegexContainer: React.FC = () => {
  const [regex, setRegex] = useState<RegExp>(initialRegex);
  const [patternInvestigatorCollection, setPatternInvestigatorCollection] =
    useState([patternInvestigator.clone(), patternInvestigator.clone()]);

  const handleAddTextString = () => {
    const newTextStrings = [
      ...patternInvestigatorCollection,
      patternInvestigator.clone(),
    ];
    setPatternInvestigatorCollection(newTextStrings);
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
        patternInvestigatorCollection={patternInvestigatorCollection}
        handlePatternInvestigatorCollectionChange={(newTextStrings) => {
          setPatternInvestigatorCollection(newTextStrings);
        }}
        regex={regex}
        currentTab={currentTab}
      />
      <AddTextStringButton handleAddTextString={handleAddTextString} />
    </Box>
  );
};
export default RegexContainer;
