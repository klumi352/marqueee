import Modal from 'react-modal';
import React, {useState} from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  Input,
  Tooltip
} from "@chakra-ui/react";
import { truncateAddress } from "../../../../utils";
import { useStateWithCallbackLazy } from 'use-state-with-callback';

export default function Bio({ isOpen, closeModal, nftName, account, library, nftId, tokenId }) {
  Modal.setAppElement('#root');
  const [message, setMessage] = useState("I'm owner of this Marquee.Market NFT. Delete my ads.");
  const [signature, setSignature] = useStateWithCallbackLazy("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signedMessage, setSignedMessage] = useState("");

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%'
    },
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const deleteAd = async (e) => {
    e.preventDefault();
    try {
      // check for errors
      let error_messages = [];
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
    if (!library) return;
    try {
      const signature_library = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      if (signature !== signature_library) {
        setSignature(signature_library, () => {
          // submit data to API after signing signature.
          finalDeleteAd(signature_library);
        });
      }
      else {
        finalDeleteAd(signature);
      }
    } catch (error) {
      setError(error);
    }
  };

  const finalDeleteAd = async (signature) => {
    try {
      let res = await fetch(process.env.REACT_APP_MARQUEE_URL + "/api/delete_banner_ad.php", {
        method: "POST",
        headers: {'Content-Type': 'multipart/form-data'},
        body: JSON.stringify({
          nft_id: nftId,
          owner: account,
          signature: signature,
          message: message,
          token_id: tokenId
        }),
      });

      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        if (resJson.success) {
          setSuccess("Banner ad #" + nftId + " successfully deleted.");
          window.location.reload();
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Banner Ad"
      >
        <ChakraProvider>
          <Heading as='h4' size='md'>Are you sure you want to delete the ads for {nftName}?</Heading>
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
            <Button colorScheme='blue' isLoading={isLoading} loadingText='Deleting' onClick={deleteAd}>Delete</Button>
          </ButtonGroup>
          <p>
            <ButtonGroup variant='outline' spacing='6' padding='10px'>
              <Button onClick={closeModal} colorScheme='blue'>Close</Button>
            </ButtonGroup>
          </p>
        </ChakraProvider>
      </Modal>
    </>
  );
}
