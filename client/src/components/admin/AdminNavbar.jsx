import React from 'react'
import { useLogoutUserMutation } from '../../redux/authApi'
import { useSelector } from 'react-redux'
import UseDevLog from '../../hooks/UseDevLog'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const AdminNavbar = () => {
    const [logout, { isSuccess, isError, error, isLoading }] = useLogoutUserMutation()
    const { user } = useSelector(state => state.auth)
    const devprint = UseDevLog()
    const { pathname } = useLocation()
    const handleActive = (arg) => clsx({
        "nav-link": true,
        "active": arg === pathname
    })

    return <>
        {isError && devprint(error)}

        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link className={handleActive("/admin")} to="/admin">Dashboard</Link>
                        <Link Link className={handleActive("/admin/cms")} to="/admin/cms" > cms</Link>
                        <Link className={handleActive("/admin/projects")} to="/admin/projects" >Projectes</Link>
                        <Link className={handleActive("/admin/profile")} to="/admin/profile" >Profile</Link>

                    </div>
                </div>

            </div>
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                    {user.name}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">about</a></li>
                    <li><button onClick={logout} type="button" class="dropdown-item">Logout</button></li>


                </ul>
            </div>
        </nav >

    </>
}

export default AdminNavbar