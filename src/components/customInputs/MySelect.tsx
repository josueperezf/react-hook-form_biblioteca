import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { Controller, useFormContext } from 'react-hook-form';
// [x: string]: any con esto le decimos que puede recibir cualquier otro paramtro y que es del tipo any
// [x: string]: es opcional sin necesidad de colocarselo, seria una propiedad computada

export interface Option {
  id: number | string,
  text: string
}
interface Props {
    id?: string,
    label: string,
    name: string,
    numero?: 'entero', 
    placeholder? : string,
    replaceAll?: string,
    type?: 'text' | 'email' | 'password',
    variant?: 	'filled' | 'outlined' | 'standard',
    options: Option[]
    onChange?: (event: SelectChangeEvent<any>) => void,
    [x: string]: any
}
export const MySelect = ({ label,name, variant, options, onChange: onChangeUser, ...props }: Props) => {
    const id = `${label}-id`;
    return (
      <Box mb={2} >
        <Controller 
          render={
            ({
              field: { onChange, ...rest},
              fieldState: {error},
            }) => (
              <FormControl {...props} fullWidth error={ ( error) ? true: false }>
              <InputLabel id={ id }>{label}</InputLabel>
                <Select labelId={id} label={label} {...rest}
                  onChange= {(e) => {
                    (onChange) && onChange(e);
                    (onChangeUser) && onChangeUser(e);
                  }}
                >
                  {
                    options.map((option: Option) => (
                      <MenuItem key={option.id} value={option.id}>{option.text}</MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>{( error) ? error.message : null}</FormHelperText>
              </FormControl>
            )
          }
          name={name}
          // control={control}
          // defaultValue={defaultValue}
        />
      </Box>
    );
};


/**
 * 
 * 
 * 
 * <Controller
          name={name}
          render={
            ({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { isTouched, error },
            }) =>
            <FormControl sx={{ m: 1, minWidth: 120 }} error={ ( error) ? true: false }>
              <InputLabel id="demo-simple-select-error-label">Age</InputLabel>
              <Select
                name={name}
                {...props}
                value={value}
                inputRef={ref}
                fullWidth
                // helperText={ (isTouched && error) ? error.message : null}
                // helperText={ ( error) ? error.message : null}
                // error={ (isTouched && error) && true }
                // error={ ( error) && true }
                label={(label) ? label : ''}
                variant={(variant)? variant : 'outlined'}
                inputProps={{
                  maxLength,
                  // style: (mayuscula) && { textTransform: "uppercase" },
                }}
                onBlur={ () => {
                  (onBlur) && onBlur();
                }}
                onChange={onChange}
                // onChange= {(e) => {
                //   (onChange) && onChange(e);
                //   (onChangeUser) && onChangeUser(e);
                // }}
                onInput={(e: any) => {
                  if (mayuscula) e.target.value = e.target.value.toUpperCase();
                  if (replaceAll) e.target.value = e.target.value.replaceAll(replaceAll);
                  if (numero && numero === 'entero') e.target.value = e.target.value.replace(/[^0-9]/ig,"");
                  (onInput) && onInput(e);
                }}
                onKeyPress={ (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key == 'Enter') setValue(name, value.trim());
                }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            <FormHelperText>Error</FormHelperText>
          </FormControl>
            }
        />
 */