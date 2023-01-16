import { Button, ButtonGroup, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState, useMemo } from 'react'
import NumberFormat from 'react-number-format';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { truncateAddress } from '../../utils'
import gal1 from '../../Assets/images/images/gal1.jpg'
import TableHader from './TableHader';
import TabMenu from './TabMenu';
import BannerGridOne from '../HomePage/Banner/BannerGridOne';
import BannerGridTwo from '../HomePage/Banner/BannerGridTwo';
import loadingGif from '../../Assets/images/loading.gif'
function OwnerListMain() {

    const [loader, setLoader] = useState(true);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState("");
    const [rand, setRand] = useStateWithCallbackLazy(0);
    const [randTitle, setRandTitle] = useState("Random");

    const getList = async (p) => {
        setLoader(true);
        try {
            let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/get_owner_list.php?limit=50&offset=" + (50 * p) + "&rand=" + rand + "&t=" + (new Date().getTime()), {
                method: "GET"
            });

            let resJson = await res.json();
            if (res.status === 200) {
                setTotalPages(resJson.total);
                setList(resJson.owners);
                setLoader(false);
            } else {
                setError("Some error occured");
            }
        } catch (error) {
            setError(error);
            setLoader(false);
        }
    }

    const retrievePage = async (p) => {
        setPage(p);
        await getList(p);
    };

    const toggleOrder = () => {
        setPage(0);
        if (rand === 1) {
            setRandTitle("Random");
            setRand(0, () => {
                //getList(0);
            });
        } else {
            setRandTitle("NFT Number");
            setRand(1, () => {
                //getList(0);
            });
        }
        console.log(rand);

    };

    const visitSite = async (e, ad_id, url) => {
        e.preventDefault();
        try {
            let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/count_visit.php", {
                method: "POST",
                body: JSON.stringify({
                    ad_id: ad_id
                }),
            });

            if (res.status === 200) {
                window.open(url);
            } else {
                setError("Some error occured");
            }
        } catch (error) {
            setError(error);
        }

        return false;
    }

    useEffect(() => {
        getList(page);
    }, [rand]);

    let start = (page - 2 <= 0) ? 0 : page - 2;
    let end = (page + 2 > totalPages - 1) ? totalPages - 1 : start + 4;
    let rows = [];
    for (let i = start; i <= end; i++) {
        rows.push(<li key={i} className="page-item"><a className="page-link" href="/#/OwnerList" onClick={() => retrievePage(i)}>{(i + 1)}</a></li>);
    }

    const test = (data) => {
        setPage(0);
        if (data.target.value === "1") {
            setRandTitle("Random");
            setRand(1, () => {
                //getList(0);
            });
        } else {
            setRandTitle("NFT Number");
            setRand(0, () => {
                //getList(0);
            });
        }
    }

    return (
        <section className="bg_f8">
            <div className="container">
                <div className="page_sm_note">
                    <p><span>Note to NFT owners:</span> You must upload ads in the NFT Owner Dashboard to be listed in this section.</p>
                </div>

                <div className="center_short">
                    <label className="form-label">Order by:</label>
                    <select className="form-select" onChange={(e) => test(e)} aria-label="Default select example">
                        <option selected={randTitle==='Random'?true:false} value="1">Random</option>
                        <option selected={randTitle!=='Random'?true:false} value="0">NFT Number</option>
                    </select>
                </div>
            </div>
            {loader ? (
                <>
                    <div className='loader-class-ownerlist'>
                        <div>
                            <img src={loadingGif} alt="Loading" /> <br /> Loading...
                        </div>

                    </div>

                </>
            ) : (
                <>
                    <div className="container">
                        <TabMenu />
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-11">
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="table-responsive">
                                            <table className="table nft_table">
                                                <TableHader />
                                                <tbody>
                                                    {list.map((owner, i) => (
                                                        <tr key={i}>
                                                            <td>{owner.banner_grid_id}</td>
                                                            <td><img src={process.env.REACT_APP_MARQUEE_URL + "/api/banner_image.php?token_id=" + owner.token_id + "&type=thumb"} alt="" /></td>
                                                            <td>{owner.nft_name}</td>
                                                            <td>
                                                                <div className="nft_color_main">
                                                                    <div className="nft_color" style={{ background: owner.color_hex_code }}></div>
                                                                    <span>{owner.color_hex_code}</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="textBold">{owner.title}</span>
                                                                <p>{owner.description}</p>
                                                            </td>
                                                            <td><Tooltip label={owner.token_id} placement="right">{truncateAddress(owner.token_id)}</Tooltip></td>
                                                            <td><NumberFormat value={owner.visits} displayType={'text'} thousandSeparator={true} /></td>
                                                            <td><a className="btn_visit" onClick={(e) => visitSite(e, owner.id, owner.url)}>Visit Site</a></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                      
                                        </div>
                                        <nav aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    {page !== 0 && (
                                                        <li className="page-item"><a className="page-link" href="/#/OwnerList" onClick={() => retrievePage(0)}>First</a></li>
                                                    )}
                                                    {page > 0 && (
                                                        <li className="page-item"><a className="page-link" href="/#/OwnerList" onClick={() => retrievePage(page - 1)}>Previous</a></li>
                                                    )}
                                                    {rows}
                                                    {page !== totalPages - 1 && (
                                                        <>
                                                            <li className="page-item"><a className="page-link" href="/#/OwnerList" onClick={() => retrievePage(page + 1)}>Next</a></li>
                                                            <li className="page-item"><a className="page-link" href="/#/OwnerList" onClick={() => retrievePage(totalPages - 1)}>Last</a></li>
                                                        </>
                                                    )}
                                                </ul>
                                            </nav>
                                    </div>

                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="container">
                                            <div class="row justify-content-md-center">
                                                <div className='col col-md-6'>
                                                    <BannerGridOne />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                        <div class="container">
                                            <div class="row justify-content-md-center">
                                                <div className='col col-md-5'>
                                                    <BannerGridTwo />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="nft_embed">
                                    <label for="email" className="form-label">Embed</label>
                                    <input type="email" className="form-control" id="email" value="<script src='https://marquee.market/marquee.js?type=3'></script>" name="email" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

export default OwnerListMain