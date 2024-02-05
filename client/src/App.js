import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Username from './components/Username'
import { Register } from './components/Register';
import { Reset } from './components/Reset';
import { Recovery } from './components/Recovery';
import { Profile } from './components/Profile';
import { PageNotFound } from './components/PageNotFound';
import { Password } from './components/Password';

//**auth middleware */
import { AuthorizeUser } from './middleware/auth';
import { ProtectRoute } from './middleware/auth';
import Home from './components/Home';
/*root routes*/
const router = createBrowserRouter([
    {
        path:'/',
        element: <Username />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/password',
        element: <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path: '/recovery',
        element: <Recovery />
    },
    {
        path: '/reset',
        element: <Reset />
    },
    {
        path:'/home',
        element:<Home />
    },
    {
        path: '*',
        element: <PageNotFound />
    },

])
export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
