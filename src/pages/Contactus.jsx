import React from 'react'
import ContactusMain from '../components/ContactusSection/ContactusMain'
import PageNav from '../components/PageNavHeroSection/PageNav'

function Contactus() {
  return (
    <>
      <PageNav heroTitle={'Contact Marquee.Market'} heroDiscription={'Your message is important to us. We will reply to you as soon as possible.'} isHero={true} />
      <ContactusMain />
      <div style={{marginBottom:'30px'}}></div>
    </>
  )
}

export default Contactus