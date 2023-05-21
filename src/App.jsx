
import './app.scss'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
//layouts
import RootLayout from './layout/rootLayout';
import IntroLayout from './layout/IntroLayout';
//pages
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
const router = createBrowserRouter([
{
  path: "/",
  element: <RootLayout />,
  errorElement: <Error />,
  children: [
  {
  path:'/',
  element:<IntroLayout />,
    children:[
    {
    path:'signup',
    element:<Signup />
    },
    {
    path:'login',
    element:<Login />
    }
    ]
  },
  ],
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
