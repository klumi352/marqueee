import React from 'react'
import { NavLink } from 'react-router-dom'

function NavLinksUrl() {
    return (
        <>
            <ul className="banner_ul">
                <li><NavLink to='/purchase'>Buy MM NFT</NavLink></li>
                <li><NavLink to='/owner-list'>NFT Owner List</NavLink></li>
                <li><NavLink to='/owner-dashboard'>NFT Owner Dashboard</NavLink></li>
                <li><NavLink to='/Forum'>NFT Owner Forum</NavLink></li>
            </ul>
        </>
    )
}

export default NavLinksUrl