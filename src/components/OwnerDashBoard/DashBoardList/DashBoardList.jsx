import React from 'react'
import gal1 from '../../../Assets/images/images/gal1.jpg'
import ListHeader from './ListHeader'

function DashBoardList() {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="table-responsive">
                            <table className="table nft_table">
                               <ListHeader />
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><img src={gal1} alt="" /></td>
                                        <td>Lorem ipsum dolor</td>
                                        <td>
                                            <div className="nft_color_main">
                                                <div className="nft_color" style={{background: '#1f373c'}}></div>
                                                <span>#1f373c</span>
                                            </div>
                                        </td>

                                        <td>4854…09921</td>
                                        <td>500</td>
                                        <td><a className="btn_visit" href="#">Sell NFT</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoardList