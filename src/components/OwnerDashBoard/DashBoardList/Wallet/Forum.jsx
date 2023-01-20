import React, {Component, useEffect, useState} from 'react';
import {
  VStack,
  Box,
  Heading,
  Text,
  Textarea,
  Input,
  Tooltip,
  Button,
  ButtonGroup
} from "@chakra-ui/react";
import FileBase64 from 'react-file-base64';
import { truncateAddress } from ".././../../../utils";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { 
    // useHistory,
     useLocation } from "react-router-dom";
import queryString from 'query-string';

const Forum = (props) => {
  const [loader, setLoader] = useState(true);
  const [isForumUser, setIsForumUser] = useState(false);
  const [message, setMessage] = useState("I'm owner of a Marquee.Market NFT");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signedMessage, setSignedMessage] = useState("");
  const [signature, setSignature] = useStateWithCallbackLazy("");
//   const history = useHistory();
  const location = useLocation();

  const tid = queryString.parse(location.search).tid;

  const submitForumProfile = async (e) => {
    e.preventDefault();
    try {
      // check for errors
      let error_messages = [];
      if (name.trim().length === 0) {
        error_messages.push("Name");
      }
      if (email.trim().length === 0) {
        error_messages.push("E-Mail");
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

      await signMessage();
      // after message gets signed, the API call gets made.
    } catch (err) {
      setError(err);
    }
  }

  const signMessage = async () => {
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
          submitAllData(signature_library);
        });
      }
      else {
        submitAllData(signature);
      }
    } catch (error) {
      setError(error);
    }
  };

  const submitAllData = async (signature) => {
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/set_forum_user.php", {
        method: "POST",
        headers: {'Content-Type': 'multipart/form-data'},
        body: JSON.stringify({
          name: name,
          email: email,
          avatar: avatar,
          owner: props.account,
          signature: signature,
          message: message
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        if (resJson.success) {
          setSuccess("User profile created successfully");
          getForumUser();
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

  const getForumUser = async () => {
    setLoader(true);
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/get_forum_user.php?nft_owner_id=" + props.account + "&t=" + (new Date().getTime()), {
        method: "GET"
      });

      let resJson = await res.json();
      if (res.status === 200) {
        if (resJson.results) {
          setName(resJson.results.name);
          setEmail(resJson.results.email);
          setAvatar(resJson.results.avatar);
        }
        setLoader(false);
        setIsForumUser(resJson.success);

        if (!resJson.success) {
        //   history.push("/#/Forum/Edit");
        }
      } else {
        setError("Some error occured");
      }
    } catch (error) {
      setError(error);
      setLoader(false);
    }
  }

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  useEffect(() => {
    getForumUser();
  }, []);
  return(
    <div className="body_wrapper my-forum-style">
      <a name="owner_list"></a>
      <VStack justifyContent="center" alignItems="center">
      {loader ? (
        <>
          <img src="/loading.gif" alt="Loading" /> <br /> Loading...
        </>
      ) : (
        <>
        {props.account ? (
          <>
            {(location.pathname == '/Forum') && isForumUser ? (
              <>
                <ButtonGroup variant='outline' spacing='6' padding='10px'>
                  <Button colorScheme='blue' loadingText='Submitting' onClick={event =>  window.location.href='/Forum/Edit'}>Edit Forum Profile</Button>
                </ButtonGroup>
                <iframe src={process.env.REACT_APP_MARQUEE_URL + "/forum/preview.php?tid=" + tid + "&name=" + name + "&email=" + email + "&owner=" + props.account + "&signature=" + props.signature + "&message=" + props.message + "&signedMessage=" + props.signedMessage} frameBorder="0" width="100%" height="750px"></iframe>
              </>
            ) : (
              <>
                <Box
                  w='100%'
                  maxWidth="lg"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  padding="10px"
                >
                  <VStack>
                    <Text fontSize='lg'><b>Note:</b> You must own a Marquee.Market NFT to create a profile. Otherwise an error will occur when saving.</Text>
                    <Heading as='h4' size='md'>Create a User Profile</Heading>
                    <Text fontSize='xs'>All fields are required.</Text>
                    <Input
                      placeholder="Name"
                      maxLength={150}
                      id="name"
                      onBlur={(e) => setName(e.target.value)}
                      defaultValue={name}
                    />
                    <Input
                      placeholder="E-Mail"
                      maxLength={200}
                      id="email"
                      onBlur={(e) => setEmail(e.target.value)}
                      defaultValue={email}
                    />
                    <Text fontSize='xs'>E-mail will be hidden from visitors</Text>

                    <label htmlFor="avatar">Avatar</label>
                    <FileBase64
                      id="avatar"
                      multiple={false}
                      onDone={(e) => setAvatar(e)}
                    />
                    {avatar && (
                      <img src={avatar.base64} />
                    )}
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
                      <div style={{width: '100%'}} className="alert alert-danger" role="alert" dangerouslySetInnerHTML={{__html: error}}></div>
                    )}
                    {success && (
                      <>
                        <div style={{width: '100%'}} className="alert alert-success" role="alert" dangerouslySetInnerHTML={{__html: success}}></div>
                      </>
                    )}
                    <ButtonGroup variant='outline' spacing='6' padding='10px'>
                      <Button colorScheme='blue' isLoading={isLoading} loadingText='Submitting' onClick={submitForumProfile}>Save</Button>
                    </ButtonGroup>
                    {isForumUser && (
                      <>
                        <ButtonGroup variant='outline' spacing='6' padding='10px'>
                          <Button colorScheme='blue' loadingText='Submitting' onClick={event =>  window.location.href='/Forum'}>Go to Forum</Button>
                        </ButtonGroup>
                      </>
                    )}
                  </VStack>
                </Box>
              </>
            )}
          </>
          ) : (
            <>
              <iframe src={process.env.REACT_APP_MARQUEE_URL + "/forum/preview.php?tid=" + tid} frameBorder="0" width="100%" height="750px"></iframe>
            </>
          )}
        </>
      )}
      </VStack>
    </div>
  )
}

export default Forum;
