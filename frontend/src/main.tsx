import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router-dom'
import { FormPage } from './components/auth/FormPage'
import { SignUp } from './components/auth/SignUp'
import { LogIn } from './components/auth/LogIn'
import { AppLayout } from './layouts/AppLayout'
import { Feed } from './components/pages/Feed'
import { CreatePost } from './components/pages/CreatePost'
//import CrescentPanel from './components/ui/CrescentPanel'


 

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/signup"/> },
  { path: "/signup", element: <FormPage><SignUp/></FormPage> },
  { path: "/login", element: <FormPage><LogIn/></FormPage> },

  {
    path: "/",
    element: <AppLayout/>,
    children: [
      { path: "home", element: <Feed/> },
      { path: "create", element: <CreatePost/> },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

 