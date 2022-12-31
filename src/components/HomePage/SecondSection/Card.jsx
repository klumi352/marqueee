import React from 'react'

function Card({ image, heading, body }) {
    return (
        <>
            <div className="col-md-6">
                <div className="tab_box">
                    <img src={image} alt="" />
                    <h5>{heading}</h5>
                    <p>{body}</p>
                </div>
            </div>
        </>
    )
}

export default Card