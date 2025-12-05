import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import Login from './Components/login.tsx'
import Dashboard from './Components/Dashboard.tsx'

const router=createBrowserRouter([
  {
    path:'/',
    Component:App,
  },
  {
    path:'/login',
    Component:Login,
  },
  {
    path:'/dashboard',
    Component:Dashboard
  }
])
createRoot(document.getElementById('root')!).render(
 <RouterProvider router={router}/>
)
