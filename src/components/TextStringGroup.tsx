import React, { useCallback, useState } from "react";
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
  UnitTest,
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
  handleTextChange,
  handleDelete: handleDelete,
}: {
  regex: RegExp;
  regexPatternFinder: PatternInvestigator;
  handleTextChange: (newText: string) => void;
  handleDelete: () => void;
}) {
  const [testSuit, setTestSuit] = useState(
    new TestSuit("Test suit", [
      new CountingMatcher(NumericComparison.MoreThan, 0),
      new StringMatcher(StringComparison.Contains, "", 0),
      new StringMatcher(StringComparison.Contains, "", 0),
    ])
  );

  const handleTestSuitChange = (newTestSuit: TestSuit) => {
    setTestSuit(newTestSuit);
  };

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
      <TestSuitContainer
        testSuit={testSuit}
        handleTestSuitChange={handleTestSuitChange}
      />
    </Box>
  );
}

function TestSuitContainer({
  testSuit,
  handleTestSuitChange,
}: {
  testSuit: TestSuit;
  handleTestSuitChange: (newTestSuid: TestSuit) => void;
}) {
  const handleAddCondition = () => {
    const newTestSuit = testSuit.clone();
    newTestSuit.unitTests.push(
      new StringMatcher(StringComparison.Contains, "", 0)
    );
    handleTestSuitChange(newTestSuit);
  };

  const handleDeleteCondition = (index: number) => {
    const newTestSuit = testSuit.clone();

    newTestSuit.unitTests.splice(index, 1);
    handleTestSuitChange(newTestSuit);
  };

  const handleConditionChange = (index: number, newCondition: UnitTest) => {
    const newTestSuit = testSuit.clone();

    newTestSuit.unitTests[index] = newCondition;
    handleTestSuitChange(newTestSuit);
  };

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

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--2, 16px)",
          alignSelf: "stretch",
        }}
      >
        {testSuit.unitTests.map((condition, index) => {
          if (condition instanceof CountingMatcher) {
            return (
              <NumericMatchCondition
                handleConditionChange={(newCondition: CountingMatcher) => {
                  handleConditionChange(index, newCondition);
                }}
              />
            );
          } else if (condition instanceof StringMatcher) {
            return (
              <StringMatchCondition
                condition={condition}
                handleDeleteCondition={() => {
                  handleDeleteCondition(index);
                }}
                handleConditionChange={(newCondition: StringMatcher) => {
                  handleConditionChange(index, newCondition);
                }}
              />
            );
          }
        })}
      </Box>

      <AddConditionButton handleAddCondition={handleAddCondition} />
    </Box>
  );
}

function AddConditionButton({
  handleAddCondition,
}: {
  handleAddCondition: () => void;
}) {
  return (
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
      onClick={handleAddCondition}
    >
      <AddCircleOutline style={{ color: "black" }} />
      Add condition
    </Button>
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

function StringMatchCondition({
  condition,
  handleDeleteCondition,
  handleConditionChange,
}: {
  condition: StringMatcher;
  handleDeleteCondition: () => void;
  handleConditionChange: (newCondition: StringMatcher) => void;
}) {
  const handleIndexChange = (newIndex: number) => {
    const newCondition = condition.clone();
    newCondition.index = newIndex;

    handleConditionChange(newCondition);
  };

  const handleOperationChange = (newOperation: StringComparison) => {
    const newCondition = condition.clone();
    newCondition.operation = newOperation;

    handleConditionChange(newCondition);
  };

  const handleStringChange = (newString: string) => {
    const newCondition = condition.clone();
    newCondition.string = newString;

    handleConditionChange(newCondition);
  };

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
        value={condition.index}
        onChange={(e) => {
          handleIndexChange(e.target.value as unknown as number);
        }}
        variant="standard"
        type="number"
        inputProps={{ min: 0 }}
        style={{
          maxWidth: "50px",
        }}
      />
      <Typography variant="h6">will</Typography>
      <FormControl variant="standard">
        <InputLabel id="select-label">Type</InputLabel>
        <Select
          labelId="select-label"
          value={condition.operation}
          onChange={(e) => {
            handleOperationChange(
              e.target.value as unknown as StringComparison
            );
          }}
          id="select-demo"
          autoWidth
          label="TYPE"
          style={{
            minWidth: "120px",
          }}
        >
          <MenuItem value={StringComparison.StartsWith}>
            {StringComparison.StartsWith}
          </MenuItem>
          <MenuItem value={StringComparison.EndsWith}>
            {StringComparison.EndsWith}
          </MenuItem>
          <MenuItem value={StringComparison.Contains}>
            {StringComparison.Contains}
          </MenuItem>
          <MenuItem value={StringComparison.DoesNotContain}>
            {StringComparison.DoesNotContain}
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="String or Regex"
        value={condition.string}
        onChange={(e) => {
          handleStringChange(e.target.value);
        }}
        variant="standard"
        style={{
          alignSelf: "stretch",
        }}
      />
      <DeleteButton onClick={handleDeleteCondition} />
    </Box>
  );
}

function NumericMatchCondition({
  handleConditionChange,
}: {
  handleConditionChange: (newCondition: CountingMatcher) => void;
}) {
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
          value={NumericComparison.MoreThan}
          autoWidth
          label="TYPE"
        >
          <MenuItem value={NumericComparison.MoreThan}>
            {NumericComparison.MoreThan}
          </MenuItem>
          <MenuItem value={NumericComparison.Equal}>
            {NumericComparison.Equal}
          </MenuItem>
          <MenuItem value={NumericComparison.LessThan}>
            {NumericComparison.LessThan}
          </MenuItem>
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
