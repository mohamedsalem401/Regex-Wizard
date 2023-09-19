import React from "react";
import { Box, Button, Typography } from "@mui/material";

export function AddRegexContainerButton({
  onClick: handleAddRegexContainer,
}: {
  onClick: () => void;
}) {
  return (
    <Button
      style={{
        display: "flex",
        padding: "15px var(--1, 8px)",
        justifyContent: "center",
        alignItems: "center",
        gap: "var(--1, 8px)",
        alignSelf: "stretch",
        borderRadius: "var(--2, 16px)",
        border: "1px dashed #000",
        background: "var(--action-hover, rgba(0, 0, 0, 0.04))",
      }}
      onClick={handleAddRegexContainer}
    >
      <Box>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
        >
          <path
            d="M23.625 10.875H19.375V19.375H10.875V23.625H19.375V32.125H23.625V23.625H32.125V19.375H23.625V10.875ZM21.5 0.25C9.77 0.25 0.25 9.77 0.25 21.5C0.25 33.23 9.77 42.75 21.5 42.75C33.23 42.75 42.75 33.23 42.75 21.5C42.75 9.77 33.23 0.25 21.5 0.25ZM21.5 38.5C12.1288 38.5 4.5 30.8712 4.5 21.5C4.5 12.1288 12.1288 4.5 21.5 4.5C30.8712 4.5 38.5 12.1288 38.5 21.5C38.5 30.8712 30.8712 38.5 21.5 38.5Z"
            fill="black" />
        </svg>
      </Box>
      <Typography
        gutterBottom={true}
        style={{ color: "rgba(0, 0, 0, 0.87)" }}
        variant="h6"
      >
        New Section
      </Typography>
    </Button>
  );
}
