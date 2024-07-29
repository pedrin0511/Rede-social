import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import LogReg from './componentes/LogReg';
import Perfil from './pages/Perfil';
import Bemvindo from './pages/Bemvindo';
import EdtitarPerfil from './pages/EditarPerfil';
import Configuraçao from './pages/Configuraçao';


const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      
      {
        path: "/perfil",
        element: <Perfil />,
      },
      {
        path: "/",
        element: <Bemvindo />,
      },
      {
        path: "/editarperfil",
        element: <EdtitarPerfil />,
      }
      ,
      {
        path: "/Config",
        element: <Configuraçao />,
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
