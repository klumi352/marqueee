import React from 'react'
import { HashLink } from 'react-router-hash-link'

function ContentSection() {
    return (
        <>
            <div className="col-md-12 col-lg-6">
                <div className="content_area content_right">
                    <h3>Invest in a movement on the <br />ground floor</h3>
                    <p>Right now, Marquee Market is a brand-new concept designed to revolutionize the way businesses advertise online. We’re starting small, with only 1,024 MM NFTs available at first launch. As we grow, we are planning to roll out new features, including the ability to target your ads to niche audiences.</p>
                    <p>Want to capitalize on this projected growth? Lock in at a low price <br />today.</p>
                    <div className='home-btn-center'><HashLink to="/purchase#" className="btn_blue">Buy MM NFT</HashLink></div>
                </div>
            </div>
        </>
    )
}

export default ContentSection