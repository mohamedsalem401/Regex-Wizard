import { Button, Typography } from '@mui/material';
import React from 'react';

export const ButtonWithIcon = ({
  text = '',
  icon = <></>,
  onClick = () => {},
  style = 'text',
}) => {
  return (
    <div className="button-container">
      <Button
        //@ts-ignore
        variant={style}
        size="small"
        onClick={onClick}
        className="DHButton"
        sx={{
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {icon}
        <Typography fontSize="14px" sx={{ textTransform: 'capitalize' }}>
          {text}
        </Typography>
      </Button>
    </div>
  );
};
