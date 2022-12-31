import React from 'react'
import nft_user from '../../../Assets/images/images/nft_user.jpg'
function BlogAuthor() {
    return (
        <>
            <div class="blog_content_box blog_founder">
                <div>
                    <img src={nft_user} alt="" />
                </div>
                <div>
                    <h4>Gregory Rzeczko</h4>
                    <h5>Founder</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
        </>
    )
}

export default BlogAuthor