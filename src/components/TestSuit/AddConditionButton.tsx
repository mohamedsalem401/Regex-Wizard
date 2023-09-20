import React from "react";
import { Button } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

export function AddConditionButton({
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
