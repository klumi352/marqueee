import React from 'react'
import Forum from '../components/BuyNftForumSection/Forum'
import PageNav from '../components/PageNavHeroSection/PageNav'

function BuyNftForum() {
    return (
        <>
            <PageNav heroTitle={'NFT Owner Forum'} heroDiscription={'Discuss ideas and say hello to fellow Marquee.Market NFT owners'} isHero={true} />
            <Forum />
            <div style={{marginBottom:'30px'}}></div>
        </>
    )
}

export default BuyNftForum    