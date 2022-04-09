import { Autocomplete, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { Controller } from 'react-hook-form';
// [x: string]: any con esto le decimos que puede recibir cualquier otro paramtro y que es del tipo any
// [x: string]: es opcional sin necesidad de colocarselo, seria una propiedad computada

export interface Option {
  id: number | string,
  label: string,
}
interface Props {
    id?: string,
    label: string,
    multiple?: boolean,
    name: string, 
    options: Option[],
    placeholder? : string, 
    variant?: 	'filled' | 'outlined' | 'standard',
    onChange?: (value: number | [] | any ) => void,
    [x: string]: any
}
export const MyAutocomplete = ({ label, name, variant, multiple, placeholder, options = [], onChange: onChangeUser, ...props }: Props) => {
  return (
    <Box mb={2} >
      <Controller
      {...props}
        name={name}
        render={({
          field: { onChange, ...fieldRest},
          fieldState: { error},
        }) => (
          <Autocomplete
            multiple={multiple ? true : false}
            {...fieldRest}
            options={options}
            getOptionLabel={(option) => option.label} // para marcar que texto se va a mostrar
            isOptionEqualToValue={(option, value) => option.id === value.id} //para marcar como selected las opciones
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={ ( error) ? error.message : null}
                error={ ( error) && true }
                label={label}
                variant={variant ?? "outlined"}
                placeholder={placeholder}
              />
            )}
            onChange={(_, data) => {
              onChange(data);
              onChangeUser && onChangeUser(data);
            }} // data es la o las opciones seleccionadas
          />
        )}
      />
    </Box>
  );
};
