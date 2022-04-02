import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import { useState } from 'react';

interface Props {
    id?: string,
    label: string,
    name: string,
    minDate?: Date,
    maxDate?: Date,
    placeholder? : string,
    [x: string]: any
  }
export const MyDatePicker = ({ minDate, maxDate, ...props }: Props) => {

  const {name, variant} = props;
  return (
    <Box mb={2} >
      <Controller
        name={name}
        render={
          ({
            field,
            fieldState: { error },
          }) =>
          <DatePicker
              InputProps={{ readOnly: true }}
              {...field}
              {...props}
              minDate={minDate}
              maxDate={maxDate}
              inputFormat='dd/MM/yyyy'
              renderInput={(params) =>
                <TextField
                  autoComplete='off'
                  {...field}
                  {...params}
                  id={props.id || props.name}
                  error={ (error) && true }
                  helperText={ ( error) ? error.message : null}
                  variant={(variant)? variant : 'outlined'}
                  fullWidth
                  // onBlur={() => {touchedFields()  }}
                />}
              // onChange={(val) => {
              //   setFieldValue(field.name, val);
              //   }
              // }
            />
        }
      />
    </Box>
  );
};
  