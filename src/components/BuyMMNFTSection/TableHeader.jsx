import React from 'react'

function TableHeader() {
    return (
        <>
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">NFT</th>
                    <th scope="col">Name</th>
                    <th scope="col">Color Hex Code</th>
                    <th scope="col">Token ID</th>
                    <th scope="col">Purchase</th>
                </tr>
            </thead>
        </>
    )
}

export default TableHeader