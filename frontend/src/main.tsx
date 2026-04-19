
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
import { LikedPosts } from './components/pages/LikedPosts'
import { Settings } from './components/pages/Settings'
import { Chat } from './components/pages/Chat'
import { Messages } from './components/pages/Messages'
import { Post } from './components/pages/Posts'
import { SkeletonTheme } from 'react-loading-skeleton'
import { AuthCallback } from './components/auth/Authcallback'



 

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
    {path: "liked", element: <LikedPosts/>},
    { path: "user/:id", element: <Profile Card={<UserProfileCard />} /> },
    { path: "profile", element: <Profile Card={<MyProfileCard />} /> },
    {path:"settings", element:<Settings/>},
    {path:"chat",element:<Chat/>},
    {path:"chat/:id",element:<Messages/>},
    {path:"/posts/:id",element:<Post/>},
  ]
},
{
  path:"/auth/callback",
  element:<AuthCallback/>
}
])

createRoot(document.getElementById('root')!).render(
    <SkeletonTheme baseColor='#313131' highlightColor='#525252'> 
      <RouterProvider router={router}/>
    </SkeletonTheme>
)

 