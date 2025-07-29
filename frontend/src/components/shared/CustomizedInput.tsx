import React from 'react';
import { TextField } from '@mui/material';

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin='normal'
      name={props.name}
      label={props.label}
      type={props.type}
      slotProps={{
        input: {
          style: {
            width: '400px',
            borderRadius: 10,
            fontSize: 20,
            color: '#E0E0E0 ',
            backgroundColor: '#1A1A1A',
          },
        },
        inputLabel: { style: { color: '#E0E0E0' } },
      }}
    />
  );
};

export default CustomizedInput;
