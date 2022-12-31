import React from 'react'
import BlogListMain from '../components/BlogSection/BlogList/BlogListMain'
import PageNav from '../components/PageNavHeroSection/PageNav'

function BlogList() {
  return (
    <>
      <PageNav heroTitle={'Marquee.Market Blog'} heroDiscription={'Latest news and updates about Marquee.Market'} isHero={true} />
      <div className='all-page-margin-bottom'>
      <BlogListMain />
      </div>
    </>
  )
}

export default BlogList  