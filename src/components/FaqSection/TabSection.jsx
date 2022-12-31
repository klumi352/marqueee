import React from 'react'

function TabSection() {
    return (
        <>
            <div className="col-md-4">
                <div className="contect_content_box">
                    <h4>Quick Navigation</h4>
                    <ul className="nav  flex-column faq_left" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">General</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">For NFT Owners</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TabSection