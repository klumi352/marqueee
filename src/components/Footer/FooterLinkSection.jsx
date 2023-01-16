import React from 'react'
import { Link } from 'react-router-dom'
import FooterAbout from './FooterAbout'
import FooterSocialLinks from './FooterSocialLinks'
import {HashLink } from 'react-router-hash-link';
function FooterLinkSection() {
    return (
        <>
            <div className="container footer_area">
                <div className="row justify-content-center">
                    <FooterAbout />
                    <div className="col-6 col-md-3 col-lg-2">
                        <h5 className="footer_title">Navigation</h5>
                        <ul className="footer_menu">
                            <li><HashLink to="/#">Home</HashLink></li>
                            <li><HashLink to="/#how-it-work">How It Works</HashLink></li>
                            <li><HashLink to="/contact-us#">Contact Us</HashLink></li>
                            <li><HashLink to="/about#">About Us</HashLink></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <ul className="footer_menu footer_mrtop">
                            <li><HashLink to="/faq#">FAQ</HashLink></li>
                            <li><HashLink to="/blog-list#">Blog</HashLink></li>
                            {/* <li><HashLink to="#">Terms & Conditions</HashLink></li>
                            <li><HashLink to="#">Privacy Policy</HashLink></li>
                            <li><HashLink to="#">Music Credits</HashLink></li> */}
                        </ul>
                    </div>
                    <div className="col-6 col-md-6 col-lg-2">
                        <ul className="footer_menu">
                            <h5 className="footer_title">NFT Owners</h5>
                            <li><HashLink to="/purchase#">Buy MM NFT</HashLink></li>
                            <li><HashLink to="/owner-list#">NFT Owner List</HashLink></li>
                            <li><HashLink to="/owner-dashboard#">NFT Owner Dashboard</HashLink></li>
                            <li><HashLink to="/Forum#">NFT Owner Forum</HashLink></li>
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