import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
function BannerLeft() {
    const [eth_usd,seteth_usd]=useState()
    const getETHPrice = async () => {
        try {
          let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/eth_usd.php?t=" + (new Date().getTime()), {
            method: "GET"
          });
  
          let resJson = await res.json();
          if (res.status === 200) {
            seteth_usd(parseFloat(resJson.data[1027].quote.USD.price).toFixed(2));
          }
        } catch (err) {
          //setError(err);
        }
      }
      useEffect(()=>{
        getETHPrice()
      },[])
    return (
        <>
            <div className="banner_content">
                <h1>Take Your Brand to the Next
                    Level with Web3 Advertising</h1>

                <p>Ready to turn your ads into investments? Get started on the world's
                    first NFT and Crypto advertising platform for just <b>1 ETH</b> today.</p>

                    {eth_usd !== 0 && (<p className="banner_subtitle">1,024 of 1,024 NFT ads available <br />Current price of ETH: <b>{eth_usd} USD</b></p>)}

                <div className='banner-btns'><Link to="/purchase" className="btn_banner">Buy MM NFT</Link><HashLink to="#video-section-scroll" class="btn_play"><i class="fa-solid fa-circle-play"></i>Watch Video </HashLink></div>
            </div>
        </>
    )
}

export default BannerLeft