import React from "react";
import { Box, Typography } from "@mui/material";
import RefrenceItem from "./RefrenceItem";
import data from "../data/cheatsheet.json";

const columns = [data.slice(0, 3), data.slice(3, 4), data.slice(4, 6)];
export const RegexReference: React.FC = () => {
  return (
    <Box
      sx={{
        // flex: 0.5,
        borderLeft: { xs: "none", sm: "1px solid #777" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          // maxHeight: "calc(100vh)",
          overflow: "auto",
          padding: "0 16px",
          flexDirection: "column",
          "&::-webkit-scrollbar": {
            width: "4px",
            backgroundColor: "#fcfcfc",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "2px",
          },
        }}
      >
        {columns.map((column, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              {column.map((row) => (
                <Box key={row.title} sx={{ mb: "40px", textAlign: "start" }}>
                  <Typography fontSize="20px" mb="10px" fontWeight={700}>
                    {row.title}
                  </Typography>

                  {row.data.map((item) => (
                    <RefrenceItem key={item.title} item={item} />
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
