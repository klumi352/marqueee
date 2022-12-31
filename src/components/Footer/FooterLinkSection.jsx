import React from 'react'
import FooterAbout from './FooterAbout'
import FooterSocialLinks from './FooterSocialLinks'

function FooterLinkSection() {
    return (
        <>
            <div className="container footer_area">
                <div className="row justify-content-center">
                    <FooterAbout />
                    <div className="col-6 col-md-3 col-lg-2">
                        <h5 className="footer_title">Navigation</h5>
                        <ul className="footer_menu">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <ul className="footer_menu footer_mrtop">
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Music Credits</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-6 col-lg-2">
                        <ul className="footer_menu">
                            <h5 className="footer_title">NFT Owners</h5>
                            <li><a href="#">Buy MM NFT</a></li>
                            <li><a href="#">NFT Owner List</a></li>
                            <li><a href="#">NFT Owner Dashboard</a></li>
                            <li><a href="#">NFT Owner Forum</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-6 col-lg-2">
                        <FooterSocialLinks />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterLinkSection