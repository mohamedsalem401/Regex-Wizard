import React, { useCallback } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { PatternInvestigator } from "../utils/PatternInvestigator";
import { RegexFinderWithDelete } from "./RegexFinderWithDelete";
import { RegexFinderWithSubtitution } from "./RegexFinderWithSubtitution";
import { AddCircleOutline, CheckCircle, Delete } from "@mui/icons-material";
import { DeleteButton } from "./DeleteButton";
import {
  CountingMatcher,
  NumericComparison,
  StringComparison,
  StringMatcher,
  TestSuit,
} from "../utils/TestSuit";

export function TextStringGroup({
  patternInvestigatorCollection,
  regex,
  handlePatternInvestigatorCollectionChange,
  currentTab,
}: {
  patternInvestigatorCollection: PatternInvestigator[];
  regex: RegExp;
  handlePatternInvestigatorCollectionChange: (
    newPatternInvestigatorCollectionChange: PatternInvestigator[]
  ) => void;
  currentTab: string;
}) {
  const handleTextChange = (index: number, newText: string) => {
    const newRegexPatternFinder = patternInvestigatorCollection[index].clone();
    newRegexPatternFinder.text = newText;
    handlePatternInvestigatorChange(index, newRegexPatternFinder);
  };

  const handleDelete = (index: number) => {
    const newPatternInvestigatorCollectionChange =
      patternInvestigatorCollection.filter((_, i) => i !== index);
    handlePatternInvestigatorCollectionChange(
      newPatternInvestigatorCollectionChange
    );
  };

  const handleTextChangeCallback = useCallback(
    (index: number, newText: string) => {
      handleTextChange(index, newText);
    },
    [handleTextChange]
  );

  const handlePatternInvestigatorChange = (
    index: number,
    newPatternInvestigator: PatternInvestigator
  ) => {
    const newPatternInvestigatorCollectionChange = [
      ...patternInvestigatorCollection,
    ];
    newPatternInvestigatorCollectionChange[index] = newPatternInvestigator;
    handlePatternInvestigatorCollectionChange(
      newPatternInvestigatorCollectionChange
    );
  };

  const handleSubtitutionChange = (index: number, newSubtitution: string) => {
    const newRegexPatternFinder = patternInvestigatorCollection[index].clone();
    newRegexPatternFinder.subtitution = newSubtitution;
    handlePatternInvestigatorChange(index, newRegexPatternFinder);
  };

  const handleSubtitutionChangeCallback = useCallback(
    (index: number, newSubtitution: string) => {
      handleSubtitutionChange(index, newSubtitution);
    },
    [handleSubtitutionChange]
  );

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: "8px",
      }}
    >
      {patternInvestigatorCollection.map((regexPatternFinder, index) => {
        return (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            {currentTab === "MATCH" && (
              <Box>
                <RegexFinderWithDelete
                  regex={regex}
                  text={regexPatternFinder.text}
                  handleTextChange={(newText: string) => {
                    handleTextChangeCallback(index, newText);
                  }}
                  handleDelete={() => {
                    handleDelete(index);
                  }}
                />
              </Box>
            )}
            {currentTab === "SUBTITUTION" && (
              <RegexFinderWithSubtitution
                regex={regex}
                regexPatternFinder={regexPatternFinder}
                handleDelete={() => {
                  handleDelete(index);
                }}
                handleTextChange={(newText) => {
                  handleTextChangeCallback(index, newText);
                }}
                handleSubtitutionChange={(newSubtitution: string) => {
                  handleSubtitutionChangeCallback(index, newSubtitution);
                }}
              />
            )}
            {currentTab === "UNIT TESTS" && (
              <RegexFinderWithTestSuit
                regex={regex}
                regexPatternFinder={regexPatternFinder}
                handleDelete={() => {
                  handleDelete(index);
                }}
                handleTextChange={(newText) => {
                  handleTextChangeCallback(index, newText);
                }}
                handleSubtitutionChange={(newSubtitution: string) => {
                  handleSubtitutionChangeCallback(index, newSubtitution);
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

function RegexFinderWithTestSuit({
  regex,
  regexPatternFinder,
  handleSubtitutionChange,
  handleTextChange,
  handleDelete: handleDelete,
}: {
  regex: RegExp;
  regexPatternFinder: PatternInvestigator;
  handleSubtitutionChange: (newSubtitution: string) => void;
  handleTextChange: (newText: string) => void;
  handleDelete: () => void;
}) {
  return (
    <Box
      style={{
        display: "flex",
        padding: "var(--2, 16px) var(--none, 0px)",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--4, 16px)",
        alignSelf: "stretch",
        borderBottom: "2px solid black",
      }}
    >
      <RegexFinderWithDelete
        regex={regex}
        text={regexPatternFinder.text}
        handleTextChange={(newText: string) => {
          handleTextChange(newText);
        }}
        handleDelete={handleDelete}
      />

      {/* TestSuit */}
      <TestSuitContainer />
    </Box>
  );
}

function TestSuitContainer() {
  const testSuit = new TestSuit("Test suit", [
    new CountingMatcher(NumericComparison.MoreThan, 0),
    new StringMatcher(StringComparison.Contains, "", 0),
    new StringMatcher(StringComparison.Contains, "", 0),
  ]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "15px",
        alignSelf: "stretch",
      }}
    >
      <TestDescription />

      <NumericMatchCondition />

      {/* StringMatchConditionGroup */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--2, 16px)",
          alignSelf: "stretch",
        }}
      >
        {testSuit.unitTests.slice(1).map((condition) => {
          return <StringMatchCondition />;
        })}
      </Box>

      <Button
        style={{
          display: "flex",
          height: "36px",
          padding: "var(--none, 0px) var(--1, 8px)",
          justifyContent: "center",
          alignItems: "center",
          gap: "var(--1, 8px)",
          alignSelf: "stretch",
          borderRadius: "4px",
          background: "rgba(0, 0, 0, 0.04)",
        }}
      >
        <AddCircleOutline style={{ color: "black" }} />
        Add condition
      </Button>
    </Box>
  );
}

function TestDescription() {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        alignSelf: "stretch",
      }}
    >
      <CheckCircle
        style={{
          fill: "#2E7D32",
        }}
      />
      <TextField label="Test description" variant="standard" fullWidth />
    </Box>
  );
}

function StringMatchCondition() {
  return (
    <Box
      style={{
        display: "flex",
        paddingBottom: "var(--2, 16px)",
        alignItems: "center",
        gap: "var(--1, 16px)",
        alignSelf: "stretch",
        borderBottom: "1px solid #000",
      }}
    >
      <CheckCircle
        style={{
          fill: "#2E7D32",
        }}
      />
      <Typography variant="h6">Match number</Typography>
      <TextField
        label="No"
        variant="standard"
        type="number"
        inputProps={{ min: 0 }}
        style={{
          maxWidth: "50px",
        }}
        value={0}
      />
      <Typography variant="h6">will</Typography>
      <FormControl variant="standard">
        <InputLabel id="select-label">Type</InputLabel>
        <Select
          labelId="select-label"
          id="select-demo"
          value={"start with"}
          autoWidth
          label="TYPE"
          style={{
            minWidth: "120px",
          }}
        >
          <MenuItem value={"start with"}>start with</MenuItem>
          <MenuItem value={"more than"}>more than</MenuItem>
          <MenuItem value={"less than"}>less than</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="String or Regex"
        variant="standard"
        style={{
          alignSelf: "stretch",
        }}
        value={"Alice"}
      />
      <DeleteButton onClick={() => {}} />
    </Box>
  );
}

function NumericMatchCondition() {
  return (
    <Box
      style={{
        display: "flex",
        paddingBottom: "var(--2, 16px)",
        alignItems: "center",
        gap: "var(--1, 16px)",
        alignSelf: "stretch",
        borderBottom: "1px solid #000",
      }}
    >
      <CheckCircle
        style={{
          fill: "#2E7D32",
        }}
      />
      <Typography variant="h6">Match</Typography>
      <FormControl variant="standard">
        <InputLabel id="select-label">Type</InputLabel>
        <Select
          labelId="select-label"
          id="select-demo"
          value={"more than"}
          autoWidth
          label="TYPE"
        >
          <MenuItem value={"equal"}>equal</MenuItem>
          <MenuItem value={"more than"}>more than</MenuItem>
          <MenuItem value={"less than"}>less than</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Count"
        variant="standard"
        type="number"
        inputProps={{ min: 0 }}
        style={{
          maxWidth: "50px",
        }}
      />
      <Typography variant="h6">times</Typography>
    </Box>
  );
}
