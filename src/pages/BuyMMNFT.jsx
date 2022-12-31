import React from 'react'
import Purchase from '../components/BuyMMNFTSection/Purchase'
import PageNav from '../components/PageNavHeroSection/PageNav'

function BuyMMNFT() {
    return (
        <>
            <PageNav heroTitle={'Purchase an NFT'} heroDiscription={'NFT owners have dashboard access for managing Marquee.market ads. Currently only 1,024 in existence!'} isHero={true} />
            <div className='all-page-margin-bottom'>
                <Purchase />
            </div>

        </>
    )
}

export default BuyMMNFT    