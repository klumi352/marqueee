import React, { useEffect, useState, useMemo } from 'react';
import {
  VStack,
  Text,
  Tooltip,
  Button,
  ButtonGroup,
  Heading
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { truncateAddress } from "../../utils";
import TableHeader from './TableHeader';
import loadingGif from '../../Assets/images/loading.gif'
const Purchase = () => {
  const NUM_PAGES = 20;

  const [loader, setLoader] = useState(true);
  const [assets, setAsset] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");

  const getAssets = async (p) => {
    setLoader(true);
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/get_assets.php?direction=asc&limit=50&offset=" + (50 * p) + "&t=" + (new Date().getTime()), {
        method: "GET"
      });

      let resJson = await res.json();
      if (res.status === 200) {
        setAsset(resJson.assets);
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
    await getAssets(p);
  };

  useEffect(() => {
    getAssets(page);
  }, []);

  let start = (page - 2 <= 0) ? 0 : page - 2;
  let end = (page + 2 > NUM_PAGES - 1) ? NUM_PAGES - 1 : start + 2;
  let rows = [];
  for (let i = start; i <= end; i++) {
    rows.push(<li key={i} className="page-item"><a className="page-link" onClick={() => retrievePage(i)}>{(i + 1)}</a></li>);
  }

  return (
    <ChakraProvider>
      <div className="body_wrapper">
        <VStack justifyContent="center" alignItems="center" h="100%" style={{ padding: '20px' }}>
          {loader ? (
            <>
              <img src={loadingGif} alt="Loading" /> <br /> Loading...
            </>
          ) : (
            <>
              <Heading as='h4' size='md'>Van Gogh's Starry Night Edition MM NFTs</Heading>
              <br />
              <div className='container page-link-center'>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {page !== 0 && (
                      <li className="page-item"><a className="page-link" onClick={() => retrievePage(0)}>First</a></li>
                    )}
                    {page > 0 && (
                      <li className="page-item"><a className="page-link" onClick={() => retrievePage(page - 1)}>Previous</a></li>
                    )}
                    {rows}
                    {page !== NUM_PAGES - 1 && (
                      <>
                        <li className="page-item"><a className="page-link" onClick={() => retrievePage(page + 1)}>Next</a></li>
                        <li className="page-item"><a className="page-link" onClick={() => retrievePage(NUM_PAGES - 1)}>Last</a></li>
                      </>
                    )}
                  </ul> Page: {page + 1}
                </nav>
              </div>
              <br />
              <div className="container table-responsive">
                <table className="table nft_table">
                  <TableHeader />
                  <tbody>
                    {assets.map((asset, i) => (
                      <tr key={i}>
                        {asset.traits.map((trait, j) => (
                          <>
                            {trait.trait_type.toLowerCase() === "editionnumber" && (
                              <>
                                <td scope="row" key={'en' + j}><span className="tbl_mobile_title">No. :</span> {trait.value}</td>
                              </>
                            )}
                          </>
                        ))}

                        <td><img src={asset.image_thumbnail_url} /></td>
                        <td><span className="tbl_mobile_title">NFT Name :</span> {asset.name}</td>

                        {asset.traits.map((trait, k) => (
                          <>
                            {trait.trait_type.toLowerCase() === "colorhexcode" && (
                              <>
                                <td key={'chc' + k}>
                                  <div className="nft_color_main">
                                  <span className="tbl_mobile_title">Color Hex Code : </span>
                                    <div className="nft_color" style={{ background: trait.value }}></div>&emsp;
                                    {trait.value}
                                  </div>
                                </td>
                              </>
                            )}
                          </>
                        ))}
                        <td><span className="tbl_mobile_title">Token ID : </span> <Tooltip label={asset.token_id} placement="right">{truncateAddress(asset.token_id)}</Tooltip></td>
                        {/* <td><span className="tbl_mobile_title">Total Unique Visits : </span>500</td> */}
                        <td><a className="btn_visit" onClick={() => window.open(asset.permalink)}>Purchase</a></td>
                      </tr>


                    ))}

                  </tbody>
                </table>
              </div>
              <div className='container page-link-center'>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {page !== 0 && (
                      <li className="page-item"><a className="page-link" onClick={() => retrievePage(0)}>First</a></li>
                    )}
                    {page > 0 && (
                      <li className="page-item"><a className="page-link" onClick={() => retrievePage(page - 1)}>Previous</a></li>
                    )}
                    {rows}
                    {page !== NUM_PAGES - 1 && (
                      <>
                        <li className="page-item"><a className="page-link" onClick={() => retrievePage(page + 1)}>Next</a></li>
                        <li className="page-item"><a className="page-link" onClick={() => retrievePage(NUM_PAGES - 1)}>Last</a></li>
                      </>
                    )}
                  </ul> Page: {page + 1}
                </nav>
              </div>
              {/*<Text><pre>{JSON.stringify(assets, null, "\t")}</pre></Text>*/}
            </>
          )}
        </VStack>
      </div>
    </ChakraProvider>
  )
}

export default Purchase;
