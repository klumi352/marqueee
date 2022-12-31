import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../.././../Assets/style/banner-grid.css";
import loadingGif from '../../../Assets/images/loading.gif'
function BannerGridTwo() {
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState("");
    const [bannerSquare, setBannerSquare] = useState([]);

    const getBannerSquare = async (not_id) => {
        console.log('---------')
        console.log(not_id)
        console.log('---------')
        setLoader(true);
        try {
            let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/get_owner_list.php?limit=1&offset=0&rand=1&not=" + not_id + "&t=" + (new Date().getTime()), {
                method: "GET"
            });

            let resJson = await res.json();
            if (res.status === 200) {
                if (resJson.total > 0) {
                    const resJsonObj = resJson.owners;
                    setBannerSquare(resJsonObj);
                }
                setLoader(false);
            } else {
                setError("Some error occured");
            }
        } catch (error) {
            setError(error);
            setLoader(false);
        }
    }

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
        getBannerSquare(0);
    }, []);
    return (
        <div className="body_wrapper">
        <VStack justifyContent="center" alignItems="center">
          {loader ? (
            <>
              <div style={{width: '320px', height: '320px'}}>
                <img src={loadingGif} alt="Loading" /> <br /> Loading...
              </div>
            </>
          ) : (
            <>
            {bannerSquare[0] ? (
                <>
                        <div className="banner_nft_main">
                            <div className="nft_img_show">
                                <Link to="#" onClick={(e) => visitSite(e, bannerSquare[0].id, bannerSquare[0].url)}><img src={process.env.REACT_APP_MARQUEE_URL + "/api/banner_image.php?token_id=" + bannerSquare[0].token_id + "&type=square"} /></Link>
                            </div>
                            <p><b>{bannerSquare[0].title}</b></p>
                            <p>{bannerSquare[0].description}</p>
                            <p>Unique Visits: <b>{bannerSquare[0].visits}</b></p>
                            <p><Link to="#" onClick={(e) => visitSite(e, bannerSquare[0].id, bannerSquare[0].url)}>{bannerSquare[0].url}</Link></p>
                            <p className="mt-3 mb-3">NFT Edition No. {bannerSquare[0].banner_grid_id}/1024</p>
                            <a onClick={(e) => getBannerSquare(bannerSquare[0].id)} className="btn_banner">Next Marquee Ad</a>
                        </div>
                </>
            ) : (<>
                <div style={{height:'500px',display:'flex',justifyContent:'center',alignItems:'center'}}>No ads yet uploaded to display.</div>
            </>)}
        </>
          )}
        </VStack>
      </div>
        
    )
}

export default BannerGridTwo