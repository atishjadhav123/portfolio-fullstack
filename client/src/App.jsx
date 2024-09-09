import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from './components/public/PublicLayout'
import AdminLayout from './components/admin/AdminLayout'
import Home from './pages/public/Home'
import Dashboard from './pages/admin/Dashboard'
import Login from './share/Login'
import Protected from './share/Protected'
import Cms from './pages/admin/Cms'
import Profile from './pages/admin/Profile'
import Projectes from './pages/admin/Projectes'
import "react-toastify/ReactToastify.min.css"
import { ToastContainer } from "react-toastify"

const App = () => {
  return <>
    {
      import.meta.env.VITE_NODE_ENV === "dev" && <div className='bg-danger p-2 position-fixed bottom-0 start-0 z-2'>
        {import.meta.env.VITE_BACKEND_URL}
      </div>
    }
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path='/admin' element={<Protected compo={<AdminLayout />} />}>
          <Route index element={<Dashboard />} />
          <Route path='cms' element={<Cms />} />
          <Route path='profile' element={<Profile />} />
          <Route path='projects' element={<Projectes />} />
        </Route>
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App