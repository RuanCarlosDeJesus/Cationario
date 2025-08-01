import { createBrowserRouter } from "react-router-dom";
import { Login } from './login/index';
import { Account } from './login/account/account';
import { Home } from './home/index';
import { Private } from './routes/private';
import { Perfil } from './perf/index';
import { Portugues } from  "./home/material/português";
import { Gramatica } from  "./home/material/português/gramatica";
import { Literatura } from  "./home/material/português/literatura";
import {Result} from "./home/material/conclusao"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <Account />,
  },
  {
    path: "/home",
    element: (
      <Private>
        <Home />
      </Private>
    ),
  },
  {
    path: "/portugues",  // Parâmetro de rota categoria
    element: <Portugues />,
  },
   {
   path: "/portugues_gramatica/:nivel",
  element: <Gramatica />,
  },
     {
    path: "/portugues_literatura/:nivel",  // Parâmetro de rota categoria
    element: <Literatura />,
  },
  {
  path: "/result",
  element: <Result />,
},
  {
    path: "/perfil",
    element: (
      <Private>
        <Perfil />
      </Private>
    ),
  },
]);

export { router };
