//line number 112 uncomment if not working and comment line number 113
import React, { Component, useEffect, useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import {
    VStack,
    Text,
    Tooltip,
    Heading,
    Button,
    ButtonGroup
} from "@chakra-ui/react";
import { truncateAddress } from "../../../../utils";
import DeleteBannerAd from "./DeleteBannerAd";
import ListHeader from '../ListHeader'
import loadingGif from '../../../../Assets/images/loading.gif'
const OwnerNFTList = (props) => {
    const [loader, setLoader] = useState(true);
    const [assets, setAsset] = useState([]);
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [error, setError] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [nftId, setNftId] = useState(0);
    const [tokenId, setTokenId] = useState(0);
    const [delIds, setDelIds] = useState([]);
    var id = [];



    const openModal = (e, name, id, token_id) => {
        e.preventDefault();
        setIsOpen(true);
        setName(name);
        setNftId(id);
        setTokenId(token_id);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const getAssets = async (p) => {
        setLoader(true);
        try {
            let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/get_assets.php?owner=" + props.account + "&direction=desc&limit=50&cursor=" + p + "&t=" + (new Date().getTime()), {
                method: "GET"
            });
            let resJson = await res.json();

            // get owner banner ids
            let resDel = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/delete_banner_ad.php?owner=" + props.account + "&t=" + (new Date().getTime()), {
                method: "GET"
            });
            let resJsonDel = await resDel.json();

            if (res.status === 200 && resDel.status === 200) {
                setDelIds(resJsonDel)
                setAsset(resJson.assets)
                setNext(resJson.next)
                setPrevious(resJson.previous)
                setLoader(false);
            } else {
                setError("Some error occured");
            }
        } catch (error) {
            setError(error);
            setLoader(false);
        }
    }

    const retrievePage = (p) => {
        getAssets(p);
    };

    useEffect(() => {
        getAssets('');
    }, []);

    return (
        <div className="body_wrapper">
            <a name="owner_list"></a>
            <VStack justifyContent="center" alignItems="center">
                {loader ? (
                    <>
                        <img src={loadingGif} alt="Loading" /> <br /> Loading...
                    </>
                ) : (
                    // <>
                    // <div className="container">
                    //                         <div className="row justify-content-center">
                    //                             <div className="col-md-12 col-lg-10">
                    //                                 <div className="table-responsive">
                    //                                     <Heading textAlign={'center'} as='h4' size='md' margin={'10'}>My Marquee.Market NFTs</Heading>
                    //                                     <table className="table nft_table">
                    //                                         <ListHeader />
                    //                                         <tbody>
                    //                                             <tr>
                    //                                                 <td>1</td>
                    //                                                 <td><img src={'gal1.png'} alt="" /></td>
                    //                                                 <td>Lorem ipsum dolor</td>
                    //                                                 <td>
                    //                                                     <div className="nft_color_main">
                    //                                                         <div className="nft_color" style={{ background: '#1f373c' }}></div>
                    //                                                         <span>#1f373c</span>
                    //                                                     </div>
                    //                                                 </td>

                    //                                                 <td>4854…09921</td>
                    //                                                 <td>500</td>
                    //                                                 <td><a className="btn_visit" href="#">Sell NFT</a></td>
                    //                                             </tr>
                    //                                         </tbody>
                    //                                     </table>
                    //                                 </div>
                    //                             </div>
                    //                         </div>
                    //                     </div>
                    // </>
                    <>
                        {props.account && (
                            <>
                                {assets.length ? (
                                    <>
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <div className="col-md-12 col-lg-10">
                                                    <div className="table-responsive">
                                                        <Heading textAlign={'center'} as='h4' size='md' margin={'10'}>My Marquee.Market NFTs</Heading>
                                                        <table className="table nft_table">
                                                            <ListHeader />
                                                            <tbody>
                                                                {assets.map((asset, i) => {
                                                                    console.log(asset)
                                                                    return(
                                                                    <>
                                                                        <tr key={i}>
                                                                            {asset.traits.map((trait, j) => (
                                                                                <>
                                                                                    {trait.trait_type.toLowerCase() === "editionnumber" && (
                                                                                        <>
                                                                                            {id[i] = trait.value && <th scope="row" key={j}>{id[i]}</th>}
                                                                                        </>
                                                                                    )}
                                                                                </>
                                                                            ))}
                                                                            <td><img src={asset.image_thumbnail_url} /></td>
                                                                            <td>{asset.name}</td>
                                                                            {asset.traits.map((trait, k) => (
                                                                                <>
                                                                                    {trait.trait_type.toLowerCase() === "colorhexcode" && (
                                                                                        <>
                                                                                            <td key={'chc' + k}>
                                                                                                <div className="nft_color_main">
                                                                                                    <div className="nft_color" style={{ background: trait.value }}></div>
                                                                                                    <span> {trait.value}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                        </>
                                                                                    )}
                                                                                </>
                                                                            ))}
                                                                            <td><Tooltip label={asset.token_id} placement="right">{truncateAddress(asset.token_id)}</Tooltip></td>
                                                                            <td>
                                                                                <ButtonGroup variant='outline' spacing='6' padding='10px'>
                                                                                    <Link to={"/Dashboard/" + asset.token_id}>
                                                                                        <Button colorScheme='blue'>Manage NFT Ad</Button>
                                                                                    </Link>
                                                                                </ButtonGroup>
                                                                            </td>
                                                                            <td>{delIds.includes(parseInt(id[i])) && (<a className="btn_visit" href="/#/Dashboard" onClick={(e) => openModal(e, asset.name, id[i], asset.token_id)}><img src={process.env.REACT_APP_MARQUEE_URL + "/delete.png"} /></a>)}</td>
                                                                        </tr>
                                                                    </>
                                                                )})}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                {previous && (
                                                    <li className="page-item"><a className="page-link" href="/#/Dashboard" onClick={() => retrievePage(previous)}>Previous</a></li>
                                                )}
                                                {next && (
                                                    <li className="page-item"><a className="page-link" href="/#/Dashboard" onClick={() => retrievePage(next)}>Next</a></li>
                                                )}
                                            </ul>
                                        </nav>
                                    </>
                                ) : (
                                    <>
                                        <p><b>You currently do not own any Marquee.Market NFTs.</b></p>
                                        <Link to={"/Purchase"}>
                                            <Button colorScheme='blue'>Purchase a Marquee.Market NFT</Button>
                                        </Link>
                                    </>
                                )}
                                {/*<Text><pre>{JSON.stringify(assets, null, "\t")}</pre></Text>**/}
                            </>
                        )}
                    </>


                )}
            </VStack>
            <DeleteBannerAd account={props.account} library={props.library} isOpen={modalIsOpen} closeModal={closeModal} nftName={name} nftId={nftId} tokenId={tokenId} />
        </div>
    )
}

export default OwnerNFTList;
