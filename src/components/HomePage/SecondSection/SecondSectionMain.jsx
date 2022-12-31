import { data } from 'jquery'
import React from 'react'
import { homesecondFeatures, homesecondMarketPlace, homesecondWallet } from '../../../data/Home'
import Card from './Card'
import SecondSectionHeader from './SecondSectionHeader'

function SecondSectionMain() {
    return (
        <>
            <section className="section_four tabmnarea">
                <div className="container">
                   <SecondSectionHeader />
                    <ul className="nav nav-pills justify-content-center index_tab_menu mt-4" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                type="button" role="tab" aria-controls="home" aria-selected="true">Core Features</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                type="button" role="tab" aria-controls="profile" aria-selected="false">Supported NFT Marketplaces</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                                type="button" role="tab" aria-controls="contact" aria-selected="false">Supported NFT Wallets</button>
                        </li>
                    </ul>

                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10">

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div className="row">
                                        {
                                            homesecondFeatures.map((data) => {
                                                return (<Card key={data.id} image={data.image} heading={data.heading} body={data.body} />)
                                            })
                                        }
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        {
                                            homesecondMarketPlace.map((data) => {
                                                return (<Card key={data.id} image={data.image} heading={data.heading} body={data.body} />)
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                    <div className="row">
                                        {
                                            homesecondWallet.map((data) => {
                                                return (<Card key={data.id} image={data.image} heading={data.heading} body={data.body} />)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default SecondSectionMain