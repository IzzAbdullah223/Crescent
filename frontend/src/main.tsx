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
import { Search } from './components/pages/Search'
import { Profile } from './components/pages/Profile'
import { UserProfileCard } from './components/profile/UserProfileCard'
import { MyProfileCard } from './components/profile/MyProfileCard'
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
    { path: "search", element: <Search/> },
    { path: "user/:id", element: <Profile Card={<UserProfileCard />} /> },
    { path: "profile", element: <Profile Card={<MyProfileCard />} /> },
  ]
}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

 