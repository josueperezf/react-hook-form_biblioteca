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

export const MyTextInput = ({ label, maxLength, mayuscula, name, numero, replaceAll, type, variant, onBlur, onChange: onChangeUser, onInput, ...props }: Props) => {
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
            type={(type) ?? type}
            name={name}
            {...props}
            value={value}
            inputRef={ref}
            fullWidth
            // helperText={ (isTouched && error) ? error.message : null}
            helperText={ ( error) ? error.message : null}
            // error={ (isTouched && error) && true }
            error={ ( error) && true }
            label={(label) ? label : ''}
            variant={(variant)? variant : 'outlined'}
            inputProps={{
              maxLength,
              // style: (mayuscula) && { textTransform: "uppercase" },
            }}
            onBlur={ () => {
              (typeof value !== 'number') && setValue(name, value.trim());
              (onBlur) && onBlur();
            }}
            onChange= {(e) => {
              (onChange) && onChange(e);
              (onChangeUser) && onChangeUser(e);
            }}
            onInput={(e: any) => {
              if (mayuscula) e.target.value = e.target.value.toUpperCase();
              if (replaceAll) e.target.value = e.target.value.replaceAll(replaceAll);
              if (numero && numero === 'entero' && e.target.value.length > 0 ) {
                const value = e.target.value.replace(/[^0-9]/ig,"");
                (value.length > 0) ? e.target.value = parseInt(value) : e.target.value = value;
              };
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
