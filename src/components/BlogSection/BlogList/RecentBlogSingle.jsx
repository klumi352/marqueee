import React from 'react'
import { Link } from 'react-router-dom'

function RecentBlogSingle({image,title,date,slug}) {
    return (
        <>
            <Link to={"/blog/"+slug}>
                <div class="blog_recent_list">
                    <img src={image} alt="" />
                    <div>
                        <p>{title}</p>
                        <h6><i class="icofont-ui-calendar"></i> {date}</h6>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default RecentBlogSingle