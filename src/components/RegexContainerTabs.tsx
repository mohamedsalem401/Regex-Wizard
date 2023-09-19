import React from "react";
import { Box, Tab, Tabs } from "@mui/material";

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
        <Tab label="UNIT TESTS" value="UNIT TESTS" />
      </Tabs>
    </Box>
  );
}
