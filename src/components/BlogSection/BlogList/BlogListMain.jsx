import React from 'react'
import BlogSection from './BlogSection'
import RecentBlog from './RecentBlog'
import ServiceData from '../../data/ServiceData';
function BlogListMain() {
    return (
        <section class="bg_f8 blog_section">
            <div class="container">
                <div class="row">
                    <BlogSection ServiceData={ServiceData} />
                    <RecentBlog ServiceData={ServiceData} />
                </div>
            </div>
        </section>
    )
}

export default BlogListMain