import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { es } from "date-fns/locale";

import { theme } from './tema.config';
import { AppRouter } from './routers/AppRouter';
import { store } from './store';
import { SnackbarProvider } from 'notistack';


function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={es} >
        <Provider store={store} >
          <SnackbarProvider maxSnack={1}>
            <AppRouter />
          </SnackbarProvider>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
