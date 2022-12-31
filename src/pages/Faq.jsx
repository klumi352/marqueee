import React from 'react'
import PageNav from '../components/PageNavHeroSection/PageNav'
import FaqSection from '../components/FaqSection/FaqSection'
function Faq() {
  return (
    <>
      <PageNav heroTitle={'FAQ'} heroDiscription={'Marquee.Market Frequently Asked Questions'} isHero={true} />
      <div className='all-page-margin-bottom'>
        <FaqSection />
      </div>
    </>
  )
}

export default Faq