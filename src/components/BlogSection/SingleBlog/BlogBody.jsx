import React from 'react'
import BlogAuthor from './BlogAuthor'
import BlogShareSocial from './BlogShareSocial'
import BlogImage from '../../../Assets/images/images/nft_blog.jpg'
import { useEffect } from 'react'
import { useState } from 'react'
import ServiceData from '../../data/ServiceData';
import { useLocation, useParams } from 'react-router-dom'
function BlogBody() {
    const[data,setData]=useState()
    const {slug} = useParams();
    useEffect(()=>{
        setData(ServiceData.singleBlogs.filter((e)=>e.slug===slug)) 
    },[])
    console.log('-----------')
    console.log(slug)
    console.log(data)
    return (
        <>
           {
            data?( <div class="col-md-12 col-lg-8">
            <div class="blog_content_box">

                <div class="blog_header">
                    <h3>{data[0].title}</h3>
                    <ul class="blog_ul">
                        <li><i class="icofont-ui-calendar"></i>{data[0].fulldate}</li>
                        <li><a href="#"><i class="icofont-share-boxed"></i> Share</a></li>
                    </ul>
                </div>

                <div class="blog_img">
                    <img src={data[0].image} alt="" />
                    <div class="blog_img_date">
                        <h3>{data[0].date}</h3>
                        <p>{data[0].month}</p>
                    </div>
                </div>

                <div class="blog_content" dangerouslySetInnerHTML={{__html: data[0].discription}}></div>
                <BlogShareSocial />

            </div>

            <BlogAuthor />

        </div>):null
           }
        </>
    )
}

export default BlogBody