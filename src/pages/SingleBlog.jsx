import React from 'react'
import SingleBlogMain from '../components/BlogSection/SingleBlog/SingleBlogMain'
import PageNav from '../components/PageNavHeroSection/PageNav'

function SingleBlog() {
  return (
    <>
      <PageNav heroTitle={'Marquee.Market Blog'} heroDiscription={'Latest news and updates about Marquee.Market'} isHero={true} />
      <div className='all-page-margin-bottom'>
        <SingleBlogMain />
      </div>
    </>
  )
}

export default SingleBlog