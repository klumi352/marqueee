import React from 'react'

function SingleCollapse({ id, title, discription, ishow,databsparent }) {
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id={`flush-heading${id}`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${id}`} aria-expanded="false" aria-controls="flush-collapseOne">
                        {title}
                    </button>
                </h2>
                <div id={`flush-collapse${id}`} className={`accordion-collapse collapse ${ishow?'show':null}`} aria-labelledby={`flush-heading${id}`} data-bs-parent={`#${databsparent}`}>
                    <div className="accordion-body" dangerouslySetInnerHTML={{ __html: discription }}></div>
                </div>
            </div>
        </>
    )
}

export default SingleCollapse