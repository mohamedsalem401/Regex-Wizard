import { Error, LibraryAddCheck } from "@mui/icons-material";

export function TestSuitIcon({ testResult }: { testResult: boolean }) {
  return testResult ? (
    <LibraryAddCheck
      style={{
        fill: "#2E7D32",
      }}
    />
  ) : (
    <Error
      style={{
        fill: "#D32F2F",
      }}
    />
  );
}
