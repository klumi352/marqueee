import React from 'react'
import ServiceData from '../data/ServiceData'
import SingleCollapse from './SingleCollapse'

function SecondTab() {
    return (
        <>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <h4>For NFT Owners</h4>
                <div className="accordion" id="accordionExample">
                    {
                        ServiceData?.faqNft.map((data, index) => {
                            return (<SingleCollapse id={data.id} title={data.title} discription={data.discription} ishow={data.show} />)
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default SecondTab