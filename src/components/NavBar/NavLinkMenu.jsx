import React from 'react'
import { NavLink } from 'react-router-dom'

function NavLinkMenu({key,href,name}) {
    return (
        <>
            <li className="nav-item" key={key}>
                <NavLink to={href} className="nav-link" >{name}</NavLink>
            </li>
        </>
    )
}

export default NavLinkMenu