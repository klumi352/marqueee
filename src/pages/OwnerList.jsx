import React from 'react'
import OwnerListMain from '../components/OwnerListSection/OwnerListMain'
import PageNav from '../components/PageNavHeroSection/PageNav'

function OwnerList() {
    return (
        <>
            <PageNav heroTitle={'NFT Owner List'} heroDiscription={'View the list of Marquee.Market NFT owners here'} isHero={true} />
            <div className='all-page-margin-bottom'>
            <OwnerListMain />
            </div>
        </>
    )
}

export default OwnerList