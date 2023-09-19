import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { flagsOptions } from "../utils/constants";

interface PatternInputProps {
  regex: RegExp;
  handleRegexChange: (newRegex: RegExp) => void;
}

export const PatternContainer: React.FC<PatternInputProps> = ({
  regex,
  handleRegexChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleStringChange = (newString: string) => {
    const newRegex = new RegExp(newString, regex.flags);
    handleRegexChange(newRegex);
  };

  const handleFlagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const flagValue = e.target.value;
    const isChecked = e.target.checked;
    let newFlags = regex.flags;

    if (isChecked && !regex.flags.includes(flagValue)) {
      newFlags += flagValue;
    } else if (!isChecked && regex.flags.includes(flagValue)) {
      newFlags = newFlags.replace(flagValue, "");
    }

    const newRegex = new RegExp(regex.source, newFlags);
    handleRegexChange(newRegex);
  };

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "stretch",
      }}
    >
      <TextField
        label="Regular Expression"
        variant="outlined"
        fullWidth
        placeholder="[A-Z]+"
        value={regex.source}
        onChange={(e) => {
          handleStringChange(e.target.value);
        }}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Typography
                style={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <Typography variant="h4" color="#00000050">
                  /
                </Typography>
              </Typography>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                style={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <Typography variant="h4" color="#00000050">
                  /
                </Typography>
                <Typography color="#22c55e" style={{ fontSize: "1.3em" }}>
                  {regex.flags}
                </Typography>
                <IconButton
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickListItem}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M34.76 42A8 8 0 0 0 32 48v168a8 8 0 0 0 16 0v-44.23c26.79-21.16 49.87-9.75 76.45 3.41c16.4 8.11 34.06 16.85 53 16.85c13.93 0 28.54-4.75 43.82-18a8 8 0 0 0 2.76-6V48a8 8 0 0 0-13.27-6c-28 24.23-51.72 12.49-79.21-1.12C103.07 26.76 70.78 10.79 34.76 42ZM208 164.25c-26.79 21.16-49.87 9.74-76.45-3.41c-25-12.35-52.81-26.13-83.55-8.4V51.79c26.79-21.16 49.87-9.75 76.45 3.4c25 12.35 52.82 26.13 83.55 8.4Z"
                    />
                  </svg>
                </IconButton>
              </Typography>
            </InputAdornment>
          ),
        }}
      />
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {flagsOptions.map((option, index) => (
          <MenuItem key={option.value} selected={index === selectedIndex}>
            <FormControlLabel
              control={
                <Checkbox
                  value={option.value}
                  defaultChecked={regex.flags.includes(option.value)}
                  onChange={handleFlagChange}
                />
              }
              label={option.title}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
