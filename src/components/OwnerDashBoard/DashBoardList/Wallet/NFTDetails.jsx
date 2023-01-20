//line number 333 uncomment if not working and comment line number 334

import React, { useEffect, useState } from 'react';
import {
  VStack,
  Text,
  Input,
  Box,
  Heading,
  Textarea,
  Tooltip,
  Button,
  ButtonGroup
} from "@chakra-ui/react";
import NumberFormatBase from 'react-number-format';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import FileBase64 from 'react-file-base64';
import { truncateAddress } from "../../../../utils";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import DeleteBannerAd from "./DeleteBannerAd";
import trashIcon from '../../../../Assets/images/delete.png'
const NFTDetails = (props) => {
  const [loader, setLoader] = useState(true);
  const [assets, setAsset] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [visits, setVisits] = useState(0);
  const [message, setMessage] = useState("I own this Marquee.Market NFT");
  const [signature, setSignature] = useStateWithCallbackLazy("");
  const [signedMessage, setSignedMessage] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingContact, setIsLoadingContact] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  // set states for form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  // and for images
  const [tinyimage, setTinyimage] = useState("");
  const [thumbimage, setThumbimage] = useState("");
  const [squareimage, setSquareimage] = useState("");
  const [name, setName] = useState("");
  const [nftId, setNftId] = useState(0);
  const [tokenId, setTokenId] = useState(0);
  var id = 0;

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

  const submitBannerForm = async (e) => {
    e.preventDefault();
    try {
      // check for errors
      let error_messages = [];
      if (title.trim().length === 0) {
        error_messages.push("Title");
      }
      if (description.trim().length === 0) {
        error_messages.push("Description");
      }
      if (url.trim().length === 0) {
        error_messages.push("URL");
      }
      if (message.trim().length === 0) {
        error_messages.push("Message For Signing");
      }
      if (error_messages.length > 0) {
        let error_message = "The following fields are required";
        error_message += "<ul>";
        for (let i = 0; i < error_messages.length; i++) {
          error_message += "<li>" + error_messages[i] + "</li>";
        }
        error_message += "</ul>";
        setError(error_message);

        return false;
      }
      setError("");
      setSuccess("");
      setIsLoading(true);

      await signMessage('banner-form');
      // after message gets signed, the API call gets made.
    } catch (err) {
      setError(err);
    }
  }

  const submitContactForm = async (e) => {
    e.preventDefault();
    try {
      // check for errors
      let error_messages = [];
      if (contactMessage.trim().length === 0) {
        error_messages.push("Your message is empty.");
        if (error_messages.length > 0) {
          let error_message = "The following fields are required";
          error_message += "<ul>";
          for (let i = 0; i < error_messages.length; i++) {
            error_message += "<li>" + error_messages[i] + "</li>";
          }
          error_message += "</ul>";
          setError(error_message);

          return false;
        }
      }

      setError("");
      setSuccess("");
      setIsLoadingContact(true);

      await signMessage('contact-form');
    } catch (err) {
      setError(err);
    }
  }

  const submitAllData = async (signature) => {
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/index.php", {
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
        body: JSON.stringify({
          title: title,
          description: description,
          url: url,
          tiny_image: tinyimage,
          thumb_image: thumbimage,
          square_image: squareimage,
          owner: props.account,
          token_id: props.tokenId,
          signature: signature,
          message: message
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        if (resJson.success) {
          setSuccess("Ad banner images and details submitted successfully");
          loadData();
        }
        else {
          let error_message = "The following errors have occured";
          error_message += "<ul>";
          for (let i = 0; i < resJson.errors.length; i++) {
            error_message += "<li>" + resJson.errors[i] + "</li>";
          }
          error_message += "</ul>";

          setError(error_message);
        }
      } else {
        setError("Some error occured");
      }
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  }

  const submitContactData = async (signature) => {
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/priority_form.php", {
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
        body: JSON.stringify({
          contact_message: contactMessage,
          owner: props.account,
          token_id: props.tokenId,
          signature: signature,
          message: message
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        if (resJson.success) {
          setSuccess("Priority contact message successfully sent");
        }
        else {
          let error_message = "The following errors have occured";
          error_message += "<ul>";
          for (let i = 0; i < resJson.errors.length; i++) {
            error_message += "<li>" + resJson.errors[i] + "</li>";
          }
          error_message += "</ul>";

          setError(error_message);
        }
      } else {
        setError("Some error occured");
      }
      setIsLoadingContact(false);
    } catch (err) {
      setError(err);
    }
  }

  const getAssets = async () => {
    setLoader(true);
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/get_assets.php?token_id=" + props.tokenId + "&limit=1&owner=" + props.account + "&t=" + (new Date().getTime()), {
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

  const loadData = async () => {
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/get_data.php?token_id=" + props.tokenId + "&t=" + (new Date().getTime()), {
        method: "GET"
      });

      let resJson = await res.json();
      if (res.status === 200) {
        if (resJson.success) {
          setVisits(resJson.results.visits);
          setTitle(resJson.results.title);
          setDescription(resJson.results.description);
          setUrl(resJson.results.url);
          setTinyimage(resJson.results.image_name_grid);
          setThumbimage(resJson.results.image_name_thumb);
          setSquareimage(resJson.results.image_name_square);
        }
      } else {
        setError("Some error occured");
      }
    } catch (err) {
      setError(err);
    }
  }

  const signMessage = async (t) => {
    if (!props.library) return;
    try {
      const signature_library = await props.library.provider.request({
        method: "personal_sign",
        params: [message, props.account]
      });
      setSignedMessage(message);
      if (signature !== signature_library) {
        setSignature(signature_library, () => {
          // submit data to API after signing signature.
          if (t === 'banner-form')
            submitAllData(signature_library);
          else
            submitContactData(signature_library);
        });
      }
      else {
        if (t === 'banner-form')
          submitAllData(signature);
        else
          submitContactData(signature);
      }
    } catch (error) {
      setError(error);
    }
  };

  const retrievePage = async () => {
    await getAssets();
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  useEffect(() => {
    getAssets();
    loadData();
  }, []);

  return (
    <div className="body_wrapper">
      <a name="owner_list"></a>
      <VStack justifyContent="center" alignItems="center">
        {loader ? (
          <>
            <img src="/loading.gif" alt="Loading" /> <br /> Loading...
          </>
        ) : (
          <>
            {props.account && (
              <>
                <div className='container'>
                  <div className='table-responsive'>
                    <table className="table nft_table">
                      <thead>
                        <tr>
                          <th scope="col">No..</th>
                          <th scope="col">NFT</th>
                          <th scope="col">Name</th>
                          <th scope="col">Color Hex Code</th>
                          <th scope="col">Token ID</th>
                          <th scope="col">Total Unique Visits</th>
                          <th scope="col">Sell</th>
                          {title && description && url && (
                            <th scope="col">Delete</th>
                          )}
                        </tr>
                      </thead>
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
                            <td><span className="tbl_mobile_title">Name : </span>{asset.name}</td>
                            {asset.traits.map((trait, k) => (
                              <>
                                {trait.trait_type.toLowerCase() === "colorhexcode" && (
                                  <>
                                    <td key={'chc' + k}>
                                      <div className="nft_color_main">
                                        <span className="tbl_mobile_title">Color Hex Code : </span>
                                        <div className="nft_color" style={{ background: trait.value }}></div>
                                        <span> {trait.value}</span>
                                      </div>
                                    </td>
                                  </>
                                )}
                              </>
                            ))}
                            <td><span className="tbl_mobile_title">Token ID : </span><Tooltip label={asset.token_id} placement="right">{truncateAddress(asset.token_id)}</Tooltip></td>
                            {/* <td><NumberFormatBase value={visits} displayType={'text'} thousandSeparator={true} /></td> */}
                            <td></td>
                            <td>
                              <ButtonGroup variant='outline' spacing='6' padding='10px'>
                                <Button onClick={() => window.open(asset.permalink + '/sell')} colorScheme='blue'>Sell NFT</Button>
                              </ButtonGroup>
                            </td>
                            {title && description && url && (
                              <td>
                                <Tooltip label='Delete ad details and banner ads'>
                                  <a href="/owner-dashboard" onClick={(e) => openModal(e, asset.name, id, asset.token_id)}><img style={{ width: '25px', height: '25px' }} src={trashIcon} /></a>
                                </Tooltip>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <Tabs>
                  <TabList>
                    <Tab>Upload Ads</Tab>
                    <Tab>Priority Contact Form</Tab>
                    <Tab>Vote</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Box
                        w='100%'
                        maxWidth="lg"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        padding="10px"
                      >
                        <VStack>
                          <Heading as='h4' size='md'>Details</Heading>
                          <Text fontSize='xs'>All fields are required.</Text>
                          <Input
                            placeholder="Title"
                            maxLength={150}
                            id="title"
                            onBlur={(e) => setTitle(e.target.value)}
                            defaultValue={title}
                          />
                          <Textarea
                            placeholder='Description'
                            size='lg'
                            maxLength={1000}
                            id="description"
                            onBlur={(e) => setDescription(e.target.value)}
                            defaultValue={description}
                          />
                          <Text fontSize='xs'>Maximum description characters: 1,000.</Text>
                          <Input
                            placeholder="URL"
                            maxLength={500}
                            id="url"
                            onBlur={(e) => setUrl(e.target.value)}
                            defaultValue={url}
                          />
                          <Text fontSize='xs'>Example: https://marquee.market/</Text>
                          <br /><br />
                          <Heading as='h4' size='md'>Ad Banner Images</Heading>
                          <Text fontSize='xs'>All banner fields are required.</Text>
                          <Text fontSize='xs'>Banners larger than the dimensions specified will be scaled to the appropriate size.</Text>
                          <label htmlFor="tiny-banner">10x10 grid banner image</label>
                          <FileBase64
                            id="tiny-banner"
                            multiple={false}
                            onDone={(e) => setTinyimage(e)}
                          />
                          {tinyimage && (
                            <img src={tinyimage.base64} />
                          )}
                          <label htmlFor="thumb-banner">125x125 thumbnail banner image</label>
                          <FileBase64
                            id="thumb-banner"
                            multiple={false}
                            onDone={(e) => setThumbimage(e)}
                          />
                          {thumbimage && (
                            <img src={thumbimage.base64} />
                          )}
                          <label htmlFor="square-banner">320x320 square banner image</label>
                          <FileBase64
                            id="square-banner"
                            multiple={false}
                            onDone={(e) => setSquareimage(e)}
                          />
                          {squareimage && (
                            <img src={squareimage.base64} />
                          )}
                          <Text fontSize='xs'>For best results, upload images with the exact dimensions as stated. Images will resize to appropriate dimensions, but may lose quality.</Text>
                          <br /><br />
                          <Text fontSize='xs'>Sign a custom message to verify ownership of your Marquee.Market NFT.</Text>
                          <Input
                            placeholder="Set Message For Signing"
                            maxLength={35}
                            onBlur={handleInput}
                            defaultValue={message}
                          />
                          {signature ? (
                            <Tooltip label={signature} placement="bottom">
                              <Text>{`Signature: ${truncateAddress(signature)}`}</Text>
                            </Tooltip>
                          ) : null}
                          {error && (
                            <div style={{ width: '100%' }} className="alert alert-danger" role="alert" dangerouslySetInnerHTML={{ __html: error }}></div>
                          )}
                          {success && (
                            <div style={{ width: '100%' }} className="alert alert-success" role="alert" dangerouslySetInnerHTML={{ __html: success }}></div>
                          )}
                          <ButtonGroup variant='outline' spacing='6' padding='10px'>
                            <Button colorScheme='blue' isLoading={isLoading} loadingText='Submitting' onClick={submitBannerForm}>Save</Button>
                          </ButtonGroup>
                        </VStack>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box
                        w='100%'
                        maxWidth="lg"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        padding="10px"
                      >
                        <VStack>
                          <Heading as='h4' size='md'>Priority Contact Form</Heading>
                          <Text fontSize='xs'>As an NFT owner, your communication with us is very important. We will take priority and reply to you as soon as possible.</Text>
                          <Textarea
                            placeholder='Your message'
                            size='lg'
                            maxLength={2000}
                            onBlur={(e) => setContactMessage(e.target.value)}
                          />
                          <br />
                          <Text fontSize='xs'>Sign a custom message to verify ownership of your Marquee.Market NFT.</Text>
                          <Input
                            placeholder="Set Message For Signing"
                            maxLength={35}
                            onBlur={handleInput}
                            defaultValue={message}
                          />
                          {signature ? (
                            <Tooltip label={signature} placement="bottom">
                              <Text>{`Signature: ${truncateAddress(signature)}`}</Text>
                            </Tooltip>
                          ) : null}
                          {error && (
                            <div style={{ width: '100%' }} className="alert alert-danger" role="alert" dangerouslySetInnerHTML={{ __html: error }}></div>
                          )}
                          {success && (
                            <div style={{ width: '100%' }} className="alert alert-success" role="alert" dangerouslySetInnerHTML={{ __html: success }}></div>
                          )}
                          <ButtonGroup variant='outline' spacing='6' padding='10px'>
                            <Button colorScheme='blue' isLoading={isLoadingContact} loadingText='Sending' onClick={submitContactForm}>Send</Button>
                          </ButtonGroup>
                        </VStack>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box
                        w='100%'
                        maxWidth="lg"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        padding="10px"
                      >
                        <VStack>
                          <Heading as='h4' size='md'>Vote</Heading>
                          <Text fontSize='xs'>Occasionally, Marquee.Market NFT owners will be able to vote here for new features on Marquee.Market. All Marquee.Market NFT owners will be notified via e-mail everytime a vote takes place. Want to see a new feature here on Marquee.Market? Post a topic about it at the <a href="/Forum">NFT Owner Forum</a>. If your fellow Marquee.Market NFT owners like it, we'll start a new voting poll here.</Text>
                        </VStack>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
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

export default NFTDetails;
