import React from 'react'
import { useParams } from 'react-router-dom'
import DashBoardList from '../components/OwnerDashBoard/DashBoardList/DashBoardList'
import SecurityPrice from '../components/OwnerDashBoard/DashBoardList/Wallet/SecurityPrice'
import WalletConnectStatus from '../components/OwnerDashBoard/WalletConnectStatus/WalletConnectStatus'
import PageNav from '../components/PageNavHeroSection/PageNav'

function OwnerDashBoard() {
    const {tokenId} = useParams();
    return (
        <>
           <PageNav heroTitle={'NFT Owner Dashboard'} heroDiscription={'Manage your ads by connecting with your NFT wallet'} isHero={true} />
            <section className="bg_f8">
               {/* <WalletConnectStatus />
               <DashBoardList /> */}
               <SecurityPrice tokenId={tokenId} />
            </section>
        </>
    )
}

export default OwnerDashBoard    