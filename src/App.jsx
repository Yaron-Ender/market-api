
import './app.scss'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
//react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//layouts
import RootLayout from './layout/RootLayout';
import IntroLayout from './layout/IntroLayout';
import SellerLayout from './layout/SellerLayout'
import BuyerLayout from './layout/BuyerLayout';
//pages
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
//action & loader
function App() {
const router = createBrowserRouter([
{
  path: "/",
  element: <RootLayout />,
  children: [
    {
   path:'/',
  element:<IntroLayout />,
  errorElement: <Error />,
    children:[
    {
    path:'signup',
    element:<Signup />
    },
    {
    path:'login',
    element:<Login />
    },
  ]
},
{
path:'seller',
element:<SellerLayout />,
errorElement:<Error />,
},
{
path:'buyer',
element:<BuyerLayout />,
errorElement:<Error />,
},
{
path:'/logout',
}
  ]
},
//  {
//    path: "*",
//    element: <NotFound />,
//  },
]);
  return (
<div>
  <RouterProvider router={router} />
  <ToastContainer />
</div>
  );
}

export default App
