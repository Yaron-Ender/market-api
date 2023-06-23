
import './app.scss'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
//react toastify
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//layouts
import RootLayout from './layout/RootLayout';
import IntroLayout from './layout/IntroLayout';
import SellerLayout, { sellerAction } from './layout/SellerLayout'
import BuyerLayout from './layout/BuyerLayout';
//pages
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BuyerShowSeller from './pages/BuyerShowSeller';
import TransactionLayout from './layout/TransactionLayout';
import SellerOrders from './pages/SellerOrders';
import SellerOrderDetails from './pages/SellerOrderDetails';
import BuyerOrders from './pages/BuyerOrders';
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
path:'/seller',
element:<SellerLayout />,
action:sellerAction,
},
{
  path:'seller/orders',
  element:<SellerOrders />,
  children:[
  {
  path:':orderID',
  element:<SellerOrderDetails />
  }
  ]
},
{
path:'/buyer',
element:<BuyerLayout />,
children:[
{
path:'/buyer/orders',
element:<BuyerOrders />
},
{
path:':dist',
element:<BuyerShowSeller />,
},
{
path:'/buyer/:dist/:id',
element:<TransactionLayout />
}
]
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
  <>  
  <RouterProvider router={router} />
  <ToastContainer />
  </>

</div>
  );
}

export default App
