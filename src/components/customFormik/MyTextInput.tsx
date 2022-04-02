import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { Controller, useFormContext } from 'react-hook-form';
// [x: string]: any con esto le decimos que puede recibir cualquier otro paramtro y que es del tipo any
// [x: string]: es opcional sin necesidad de colocarselo, seria una propiedad computada

interface Props {
    id?: string,
    label: string,
    maxLength: number,
    mayuscula?: boolean,
    name: string,
    numero?: 'entero', 
    placeholder? : string,
    replaceAll?: string,
    type?: 'text' | 'email' | 'password',
    variant?: 	'filled' | 'outlined' | 'standard',
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => void,
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    onInput?: (event: React.FormEvent<HTMLInputElement> ) => void,
    [x: string]: any

}

export const MyTextInput = ({ label, maxLength, mayuscula, name, numero, replaceAll, variant, onBlur, onChange: onChangeUser, onInput, ...props }: Props) => {
    const { setValue } = useFormContext(); // retrieve all hook methods
    return (
      <Box mb={2} >
        <Controller
          name={name}
          render={
            ({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { isTouched, error },
            }) =>
          <TextField
            name={name}
            {...props}
            value={value}
            inputRef={ref}
            error={ (isTouched && error) && true }
            fullWidth
            helperText={ (isTouched && error) ? error.message : null}
            label={(label) ? label : ''}
            variant={(variant)? variant : 'outlined'}
            inputProps={{
              maxLength,
              // style: (mayuscula) && { textTransform: "uppercase" },
            }}
            onBlur={ () => {
              setValue(name, value.trim());
              (onBlur) && onBlur();
            }}
            onChange= {(e) => {
              (onChange) && onChange(e);
              (onChangeUser) && onChangeUser(e);
            }}
            onInput={(e: any) => {
              if (mayuscula) e.target.value = e.target.value.toUpperCase();
              if (replaceAll) e.target.value = e.target.value.replaceAll(replaceAll);
              if (numero && numero === 'entero') e.target.value = e.target.value.replace(/[^0-9]/ig,"");
              (onInput) && onInput(e);
            }}
            onKeyPress={ (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key == 'Enter') setValue(name, value.trim());
            }}
          />
            }
        />
      </Box>
    );
};
