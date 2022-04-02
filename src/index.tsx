/* eslint-disable no-lone-blocks */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

{
  /* <BrowserRouter>
      <Routes>
        <Route path='/' element={<IniciarSesion/>}>
          <Route index element={< LoginForm/>} />
        </Route>
        <Route path='clientes' element={<Layout/>}>
          <Route index element={<Inicio/>} />
          <Route path='nuevo' element={<NuevoCliente/>} />
          <Route path='editar/:id' element={<EditarCliente />} />
          <Route path=':id' element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
*/}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
