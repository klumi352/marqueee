import React from 'react'
import RecentBlogSingle from './RecentBlogSingle'
import ServiceData from '../../data/ServiceData';
function RecentBlog() {
    return (
        <>
            <div class="col-md-12 col-lg-4">
                <div class="blog_recent">
                    <div class="blog_recent_header">
                        <h3>Recent Posts</h3>
                    </div>
                    <div class="blog_recent_body">
                        {
                            ServiceData?.rpost?.map((data,i)=>{
                                return(<RecentBlogSingle key={data.id} image={data.image} title={data.ptitle} date={data.date} slug={data.link} />)
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecentBlog