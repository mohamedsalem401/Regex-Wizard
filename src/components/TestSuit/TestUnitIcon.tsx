import React from "react";
import { Cancel, CheckCircle } from "@mui/icons-material";

export function TestUnitIcon({ testResult }: { testResult: boolean; }) {
  return testResult ? (
    <CheckCircle
      style={{
        fill: "#2E7D32",
      }} />
  ) : (
    <Cancel
      style={{
        fill: "#D32F2F",
      }} />
  );
}
