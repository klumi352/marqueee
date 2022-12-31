import React from 'react'

function HeroSectionData({heroTitle,heroDiscription}) {
    return (
        <>
            <div className="page_title">
                <h1>{heroTitle}</h1>
                <p>{heroDiscription}</p>
            </div>
        </>
    )
}

export default HeroSectionData