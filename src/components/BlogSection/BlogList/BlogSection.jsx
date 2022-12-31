import React from 'react'
import NextAndPrevious from './NextAndPrevious'
import SingleBlog from './SingleBlog'


function BlogSection({ServiceData}) {
    return (
        <>
            <div class="col-md-12 col-lg-8">
                {
                    ServiceData.Blist.map((data,i)=>{
                        return(<SingleBlog key={data.id} title={data.btitle} date={data.pdate} month={data.Month} year={data.year} image={data.image} discription={data.bdescription} slug={data.link} />)
                    })
                }
                
                {/* <NextAndPrevious /> */}
            </div>
        </>
    )
}

export default BlogSection