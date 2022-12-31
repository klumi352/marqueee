import React from 'react'
import RecentBlog from '../BlogList/RecentBlog'
import BlogBody from './BlogBody'


function SingleBlogMain() {
    return (
        <>
            <section class="bg_f8 blog_section">
                <div class="container">
                    <div class="row">
                        <BlogBody />
                        <RecentBlog />
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleBlogMain