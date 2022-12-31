import React from 'react'
import NavBarMain from '../components/NavBar/NavBarMain'
import '../Assets/style/style.css'
import NavMobile from '../components/NavBar/NavMobile'
import BannerMain from '../components/HomePage/Banner/BannerMain'
import FirstSectionMain from '../components/HomePage/FirstSection/FirstSectionMain'
import VideoMain from '../components/HomePage/VideoSection/VideoMain'
import SecondSectionMain from '../components/HomePage/SecondSection/SecondSectionMain'
import ThirdSectionMain from '../components/HomePage/ThirdSection/ThirdSectionMain'
import FourthSectionMain from '../components/HomePage/FourthSection/FourthSectionMain'
import PageNav from '../components/PageNavHeroSection/PageNav'
function Home() {
  return (
    <>
      <PageNav isHero={false} />
      <BannerMain />
      <FirstSectionMain />
      <VideoMain />
      <SecondSectionMain />
      <ThirdSectionMain />
      <FourthSectionMain />
    </>
  )
}

export default Home