import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

function NavLinkMenu({key,href,name}) {
    return (
        <>
            <li className="nav-item" key={key}>
                <HashLink to={href} className="nav-link" >{name}</HashLink>
            </li>
        </>
    )
}

export default NavLinkMenu