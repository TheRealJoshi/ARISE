import * as React from 'react';
import Button from '@mui/material/Button';
import * as ReactDOM from "react-dom/client";
import Splash from './screens/Splash'
import Dashboard from './screens/Dashboard'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash/>,
  },
  {
    path: "/Dashboard",
    element: <Dashboard/>,
  },
]);

// ReactDOM.createRoot(document.getElementById("root")).render(
  
// );

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
