import React from 'react';
import {Box, Typography} from "@mui/material";

const FieldSet = ({ title, children, ...props }) => {
  return (
    <Box component="fieldset" {...props}>
      {title && <Typography component="legend">{title}</Typography>}
      {children}
    </Box>
  );
};

export default FieldSet;
