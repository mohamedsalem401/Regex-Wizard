import { Box, TextField } from "@mui/material";
import { TestSuitIcon } from "./TestSuitIcon";

export function TestDescription({
  description,
  handleTestDescriptionChange,
  testResult,
}: {
  description: string;
  handleTestDescriptionChange: (newDescription: string) => void;
  testResult: boolean;
}) {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        alignSelf: "stretch",
      }}
    >
      <TestSuitIcon testResult={testResult} />
      <TextField
        label="Test description"
        value={description}
        onChange={(e) => {
          handleTestDescriptionChange(e.target.value);
        }}
        variant="standard"
        fullWidth
      />
    </Box>
  );
}
