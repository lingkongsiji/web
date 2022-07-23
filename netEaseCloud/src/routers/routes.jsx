import { Navigate } from 'react-router-dom'
import Layout from "../layout/Layout"
import Personal from "../pages/Personal"
import Home from '../pages/personal/Home'
import Dynamic from '../pages/personal/Dynamic'

const routes = [
    {
        path: '/',
        element: <Navigate to='/home' />
    }, {
        path: '/home',
        element: <Layout />
    },{
        path: '/personal',
        element: <Navigate to='/personal/home' />
    },{
        path: '/personal',
        element: <Personal />,
        children: [
            {
                path: '/personal/home',
                element: <Home />,
            },{
                path: '/personal/dynamic',
                element: <Dynamic />,
            },{
                path: '/personal/broadcast',
                element: null,
            }
        ]
    }
]
export default routes