import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { Controller, useFormContext } from 'react-hook-form';
// [x: string]: any con esto le decimos que puede recibir cualquier otro paramtro y que es del tipo any
// [x: string]: es opcional sin necesidad de colocarselo, seria una propiedad computada

interface Props {
    id?: string,
    label: string,
    min: number,
    max: number,
    name: string, 
    placeholder? : string,
    variant?: 	'filled' | 'outlined' | 'standard',
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => void,
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    onInput?: (event: React.FormEvent<HTMLInputElement> ) => void,
    [x: string]: any
}
/**
 * 
 * 
 * INCOMPLETO, FALTA PROBAR
 * 
 * 
 */
export const MyNumberInput = ({ label, max, min, name, variant, onChange: onChangeUser, onInput, ...props }: Props) => {
    const { setValue } = useFormContext(); // retrieve all hook methods
    return (
      <Box mb={2} >
        <Controller
          name={name}
          render={
            ({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { error },
            }) =>
          <TextField
            type='number'
            name={name}
            {...props}
            value={value}
            inputRef={ref}
            fullWidth
            helperText={ ( error) ? error.message : null}
            error={ ( error) && true }
            label={(label) ? label : ''}
            variant={(variant)? variant : 'outlined'}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              min, max
            }}
            onBlur={onBlur}
            onChange= {(e) => {
              (onChange) && onChange(e);
              (onChangeUser) && onChangeUser(e);
            }}
            onInput={(e: any) => {
              (onInput) && onInput(e);
              
            }}
          />
            }
        />
      </Box>
    );
};
