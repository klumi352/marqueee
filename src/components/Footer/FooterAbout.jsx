import React from 'react'
import LogoMain from '../Logo/LogoMain'
import Logo from '../../Assets/images/logo/logo_footer.svg'

function FooterAbout() {
    return (
        <>
            <div className="col-12 col-md-6 col-lg-4 footer_logo_area">
                <LogoMain image={Logo} addClass={'footer_logo'} />
                <p class="logo_slogan">Your key to advertising</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
            </div>
        </>
    )
}

export default FooterAbout