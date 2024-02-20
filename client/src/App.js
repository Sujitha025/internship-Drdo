import React,{ useEffect } from 'react'
import {createBrowserRouter,RouterProvider,useNavigate} from 'react-router-dom'
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
import Hero from './components/Hero' 
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
        element: <ProtectRoute><Recovery /></ProtectRoute>
    },
    {
        path: '/reset',
        element: <ProtectRoute><Reset /></ProtectRoute>
    },
    {
        path:'/home',
        element: <AuthorizeUser><Home /></AuthorizeUser>
     },
    {
        path:'/hero',
        element:<AuthorizeUser><Hero /></AuthorizeUser>
    },
    // {
    //     path:'/contact',
    //     element:<Contact />
    // },
    {
        path: '*',
        element: <PageNotFound />
    },

])
// export default function App() {
//     return (
//         <RouterProvider router={router}>
//             <MainComponent />
//         </RouterProvider>
//     );
// }

// export default function App(){
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         console.log('Token:', token);
//         if (token) {
//             // User is already logged in, navigate to the desired route
//             navigate('/home');
//         }
//     }, [navigate]);

//         return (
//             <RouterProvider router={router}>
//             </RouterProvider>
//         ); // Or any other component you want to render
// };

export default function App() {
    
  return (
    <main>
        <RouterProvider router={router}><MainComponent /></RouterProvider>
    </main>
  )
}
const MainComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            // User is already logged in, navigate to the desired route
            navigate('/home');
        }
    }, [navigate]);

    return null;
};
