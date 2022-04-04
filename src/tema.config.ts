import { createTheme } from '@mui/material/styles';
import { green, purple, blue, red } from '@mui/material/colors';
import { esES } from '@mui/x-data-grid';
import { esES as coreEsES } from '@mui/material/locale';
declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
      dashed: true;
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
    components: {
        MuiListItemText : {
            styleOverrides: {
                root: {
                    color: 'red',
                    marginLeft: '5px'
                }
            }
        },
        MuiButton: {
          variants: [
            {
              props: { variant: 'dashed' },
              style: {
                textTransform: 'none',
                border: `2px dashed ${blue[500]}`,
              },
            },
            {
              props: { variant: 'dashed', color: 'secondary' },
              style: {
                border: `4px dashed ${red[500]}`,
              },
            },
          ],
        },
      },
},
esES,
coreEsES
);