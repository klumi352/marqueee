import React from 'react'
import AboutMain from '../components/AboutSection/AboutMain'
import PageNav from '../components/PageNavHeroSection/PageNav'

function About() {
    return (
        <>
            <PageNav heroTitle={'About Us'} heroDiscription={'Get to know the world’s first NFT and crypto advertising platform'} isHero={true} />
            <div className='all-page-margin-bottom'>
            <AboutMain />
            </div>
        </>
    )
}

export default About