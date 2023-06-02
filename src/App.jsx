
import './app.scss'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
//layouts
import RootLayout from './layout/RootLayout';
import IntroLayout from './layout/IntroLayout';
import TransactionLayout from './layout/TransactionLayout';
//pages
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
//action & loader
//  import { introLoader } from './layout/IntroLayout'
 import { loader as transactionLoader } from './layout/TransactionLayout';
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
  // loader:introLoader,
  // action:introAction,
    children:[
    {
    path:'signup',
    element:<Signup />
    },
    {
    path:'login',
    element:<Login />
    },
    {
    path:'transaction',
    element:<TransactionLayout />,
    errorElement:<Error />,
    loader:transactionLoader,
    }
    ]
  },
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
      </div>
  
    
  )
}

export default App
