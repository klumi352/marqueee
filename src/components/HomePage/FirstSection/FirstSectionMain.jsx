import React from 'react'
import { homefirst } from '../../../data/Home'
import Cards from './Cards'
import { HashLink } from 'react-router-hash-link';
function FirstSectionMain() {
    return (
        <>
            <section  className="section_two" id="how-it-work">
                <div className="container" >
                    <h4 className="index_title">There’s A Smarter Way To Attract New Leads Online.</h4>
                    <p className="index_subtitle">Access the end-to-end ad campaign control you deserve with Marquee Market.</p>

                    <div className="row justify-content-center">
                        {
                            homefirst.map((data) => {
                                return (
                                    <Cards key={data.id} image={data.image} heading={data.heading} body={data.body} />
                                )
                            })
                        }
                    </div>
                    <div className="btn_learn_more">
                        <HashLink to="/blog/Marquee_Market_has_Launched#">Learn More</HashLink>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FirstSectionMain