import React from 'react'

function Cards({image,heading,body}) {
    return (
        <>
            <div className="col-md-6 col-lg-4">
                <div className="sec_two_card">
                    <img src={image} alt="" />
                    <h5>{heading}</h5>
                    <p>{body}</p>
                </div>
            </div>
        </>
    )
}

export default Cards