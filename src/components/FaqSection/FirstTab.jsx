import React from 'react'
import ServiceData from '../data/ServiceData'
import SingleCollapse from './SingleCollapse'

function FirstTab() {
  return (
   <>
    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h4>General</h4>
                    <div className="accordion" id="accordionExample">
                    {
                        ServiceData?.faqGeneral.map((data, index) => {
                            return (<SingleCollapse id={data.id} title={data.title} discription={data.discription} ishow={data.show} />)
                        })
                    }
                    </div>

                </div>
   </>
  )
}

export default FirstTab