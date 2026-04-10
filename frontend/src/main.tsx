import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router-dom'
import { FormPage } from './components/auth/FormPage'
import { SignUp } from './components/auth/SignUp'
import { LogIn } from './components/auth/LogIn'
import { Home } from './components/pages/Home'
import CrescentPanel from './components/ui/CrescentPanel'

const router = createBrowserRouter([
  {path:"/",
    element:<Navigate to={'/signup'}/>
  },
  {
    path:"/signup",
     element:<FormPage><SignUp/></FormPage>
  },
  {
    path:"/login",
    element:<FormPage><LogIn/></FormPage>
  },
  {
    path:"/lmao",
    element:<CrescentPanel/>
  },
  {
    path:"/home",
    element:<Home/>
  },
 
    
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

 