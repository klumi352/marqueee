import React from 'react'
import { ShareSocial } from 'react-share-social';
function BlogShareSocial() {
  const style = {
    background: '#ffffff',
    borderRadius: 3,
    border: 0,
    color: 'white',
    padding: '0',
  };
  return (
    <>
      <div className="blog_footer">
        <p className='blog-share'>Share</p>
        {/* <ul class="blog_social_share">
            <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-reddit"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
            <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
        </ul> */}
        <ShareSocial
          style={style}
          url="https://marquee.market/#/Marquee_Market_has_Launched"
          socialTypes={['facebook', 'twitter', 'reddit', 'linkedin', 'email']}
        />
      </div>

    </>
  )
}

export default BlogShareSocial