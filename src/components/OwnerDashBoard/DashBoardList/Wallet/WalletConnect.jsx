import React from 'react';
import { useEffect, useState } from "react";
import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box
} from "@chakra-ui/react";
import SelectWalletModal from "../../../Models/Model";
import OwnerNFTList from './OwnerNFTList';
import NFTDetails from './NFTDetails';
import Forum from './Forum';
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "../../../../networks";
import { connectors } from "../../../Connection/connectors";
import { toHex, truncateAddress } from "../../../../utils";
import { useLocation } from 'react-router-dom';

const WalletConnect = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [network, setNetwork] = useState(undefined);
  const [message, setMessage] = useState("I am a Marquee.Market NFT Owner. Grant me write access to this forum.");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  const [pathname, setPathname] = useState("");
  const location = useLocation();

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    refreshState();
    deactivate();
  };

  useEffect(() => {
    console.log(location.pathname)
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
    setPathname(location.pathname);
  }, [location.pathname]);

  return (
    <div className="body_wrapper">
      <br /><br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="connection_status">
              <h4>Connection Status: {active ? (
                <CheckCircleIcon color="green" />
              ) : (
                <WarningIcon color="#cd5700" />
              )}</h4>
              <Tooltip label={account} placement="right">
                <Text>{`Account: ${truncateAddress(account)}`}</Text>
              </Tooltip>
              {!active ? (
                <button onClick={onOpen} className="btn_dis">Connect Wallet</button>
              ) : (
                <button onClick={disconnect} className="btn_dis">Disconnect</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <VStack justifyContent="center" alignItems="center">
        {(pathname == '/Forum' || pathname == '/Forum/') &&
          <>
            {active && (
                <div className='container'>
                  <div className='row justify-content-center'>
                <div className='col-md-6'>
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    padding="10px"
                  >

                    <VStack>
                      <Button onClick={signMessage} isDisabled={!message}>
                        Sign Messagee
                      </Button>
                      <div className='container'>
                        <Input
                        w='100%'
                          placeholder="Set Message"
                          onChange={handleInput}
                          value={message}
                        />
                      </div>
                      {signature ? (
                        <Tooltip label={signature} placement="bottom">
                          <Text>{`Signature: ${truncateAddress(signature)}`}</Text>
                        </Tooltip>
                      ) : null}
                    </VStack>

                  </Box>
                  </div>
                  </div>
                </div>
            )}
          </>
        }
        <Text>{error ? error.message : null}</Text>
      </VStack>
      {/* <OwnerNFTList account={account} library={library} /> */}
      {account ? (
        <>
          {(pathname == '/Forum' || pathname == '/Forum/' || pathname == '/Forum/Edit' || pathname == '/Forum/Edit/') ? (
            <>
              <Forum account={account} library={library} signature={signature} message={message} signedMessage={signedMessage} />
            </>
          ) : (
            <>
              {props.hasOwnProperty('tokenId') && props.tokenId ? (
                <>
                  <NFTDetails account={account} tokenId={props.tokenId} library={library} />
                </>
              ) : (
                <>
                  <OwnerNFTList account={account} library={library} />
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {(pathname == '/Forum' || pathname == '/Forum/' || pathname == '/Forum/Edit' || pathname == '/Forum/Edit/') ? (
            <>
              <iframe src={process.env.REACT_APP_MARQUEE_URL + "/forum/preview.php?destroy=true"} frameBorder="0" width="100%" height="750px"></iframe>
            </>
          ) : (
            <>
              <VStack justifyContent="center" alignItems="center" padding="10px 0">
                <p>You must be connected to your CryptoWallet to access this section.</p>
              </VStack>
            </>
          )}
        </>
      )}

      <br /><br />
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </div>
  );
}

export default WalletConnect;
