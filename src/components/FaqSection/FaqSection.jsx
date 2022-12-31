import React from 'react'
import TabContaint from './TabContaint'
import TabSection from './TabSection'

function FaqSection() {
    return (
        <>

            <section className="bg_f8 contact_section">
                <div className="container">
                    <div className="row justify-content-center">
                        <TabSection />
                        <div className="col-md-8">
                            <div className="contect_content_box">
                                <TabContaint />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FaqSection    