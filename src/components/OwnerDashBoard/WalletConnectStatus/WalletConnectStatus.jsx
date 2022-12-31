import React from 'react'

function WalletConnectStatus() {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="connection_status">
                            <h4>Connection Status: <i className="fa-solid fa-circle-check"></i></h4>
                            <p>Account: 0x95…Bf50e</p>
                            <button className="btn_dis">Disconnect</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WalletConnectStatus