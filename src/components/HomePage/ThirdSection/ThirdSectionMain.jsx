import React from 'react'
import ContentSection from './ContentSection'
import ImageSection from './ImageSection'

function ThirdSectionMain() {
  return (
  <>
  <section className="section_five">
            <div className="container">
                <div className="row">
                   <ImageSection />
                   <ContentSection />
                </div>
            </div>
        </section>
  </>
  )
}

export default ThirdSectionMain