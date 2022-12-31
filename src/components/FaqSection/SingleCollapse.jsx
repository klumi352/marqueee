import React from 'react'

function SingleCollapse({id,title,discription,ishow}) {
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id={`headingOne${id}`}>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#abc${id}`} aria-expanded="true" aria-controls="collapseOne">
                        {title}
                    </button>
                </h2>
                <div id={`abc${id}`} className={`accordion-collapse collapse ${ishow?'show':null}`} aria-labelledby={`headingOne${id}`} data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p dangerouslySetInnerHTML={{__html: discription}}></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleCollapse