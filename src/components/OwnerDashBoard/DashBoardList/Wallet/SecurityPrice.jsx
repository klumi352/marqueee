import React, { Component } from 'react';
import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

import WalletConnect from './WalletConnect';

const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
};

function SecurityPrice({tokenId}) {
    return (
        <StrictMode>
            <ChakraProvider>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <WalletConnect tokenId={tokenId} />
                </Web3ReactProvider>
            </ChakraProvider>
        </StrictMode>
    )
}

export default SecurityPrice