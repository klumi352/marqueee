import React from 'react'
import FirstTab from './FirstTab'
import SecondTab from './SecondTab'

function TabContaint() {
    return (
        <>

            <div className="tab-content" id="myTabContent">
               <FirstTab />
               <SecondTab />
            </div>
        </>
    )
}

export default TabContaint