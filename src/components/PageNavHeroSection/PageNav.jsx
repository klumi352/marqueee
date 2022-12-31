import React from 'react'
import { NavLink } from 'react-router-dom'
import HeroSectionData from './HeroSectionData'
import NavLinksUrl from './NavLinksUrl'

function PageNav({heroTitle,heroDiscription,isHero}) {
    return (
        <>
            <section className={!isHero?"hero_section ":"hero_section"}>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-12">
                            <NavLinksUrl />
                        </div>
                        {isHero?<HeroSectionData heroTitle={heroTitle} heroDiscription={heroDiscription} />:null}
                    </div>
                </div>
            </section>
        </>
    )
}

export default PageNav