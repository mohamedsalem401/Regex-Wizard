import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { TestSuitIcon } from "./TestSuit/TestSuitIcon";

export function RegexContainerTabs({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Box
      style={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
      }}
    >
      <Tabs
        value={currentTab}
        onChange={(_e, value) => {
          setCurrentTab(value);
        }}
        aria-label="basic tabs example"
      >
        <Tab label="MATCH" value="MATCH" />
        <Tab label="SUBTITUTION" value="SUBTITUTION" />
        <Tab
          style={{
            display: "flex",
            // padding: "9px var(--2, 16px)",
            // justifyContent: "center",
            // alignItems: "center",
            gap: "var(--1, 8px)",
          }}
          label="UNIT TESTS"
          value="UNIT TESTS"
          iconPosition="start"
          icon={<TestSuitIcon testResult={false} />}
        />
      </Tabs>
    </Box>
  );
}
