import React from 'react'
import { Link } from 'react-router-dom'

function SingleBlog({title,date,month,year,image,discription,slug}) {
    return (
        <>
            <div class="blog_content_box">
                <div class="blog_header">
                    <h3>{title}</h3>
                    <ul class="blog_ul">
                        <li><i class="icofont-ui-calendar"></i>{`${month} ${date} ${year}`}</li>
                        <li><a href="#"><i class="icofont-share-boxed"></i> Share</a></li>
                    </ul>
                </div>
                <div class="blog_img">
                    <img src={image} alt="" />
                    <div class="blog_img_date">
                        <h3>{date}</h3>
                        <p>{month}</p>
                    </div>
                </div>
                <div class="blog_content">
                    <p>{discription}</p>

                    <div class="btn_read_more">
                        <Link to={"/blog/"+slug}>Read More <i class="icofont-simple-right"></i></Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SingleBlog