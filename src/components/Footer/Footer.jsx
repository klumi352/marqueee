import React from 'react'
import CopyRightSection from './CopyRightSection'
import FooterLinkSection from './FooterLinkSection'
import SubscribeSection from './SubscribeSection'

function Footer() {
    return (
        <>
            <footer>
                <SubscribeSection />
                <FooterLinkSection />
                <CopyRightSection />
            </footer>
        </>
    )
}

export default Footer