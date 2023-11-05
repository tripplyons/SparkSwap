/*import Button from './Button';
import Input from './Input';
import Order from './Order';
import { formatUnits } from 'ethers';
import { useContractInfiniteReads, paginatedIndexesConfig } from 'wagmi'
import TradeClaims from '../src/contracts/TradeClaims.json'
import Card from './Card';
import React from 'react';
import Button from './Button';
import Input from './Input';
import { parseEther } from 'ethers';

import { useState } from 'react';
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import TradeClaims from '../src/contracts/TradeClaims.json'
import ClaimToken from '../src/contracts/ClaimToken.json'
import Card from './Card';

export default function AcceptRequest({ tokenAddress, exchangeAddress, buy }) {
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [etherAmount, setEtherAmount] = useState("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: exchangeAddress,
    abi: TradeClaims.abi,
    functionName: buy ? 'acceptBuyOffer' : 'acceptSellOffer',
  })

  const approveToken = useContractWrite({
    address: tokenAddress,
    abi: ClaimToken.abi,
    functionName: 'approve',
  })


    //Accept buy order stuff
    setAddress(e.target.value)
    //Order ID
    setId(e.target.value)
    //Ether amount
    setEtherAmount(e.target.value)
    //Wacky button
      <Button onClick={() => {
          write({
            args: [id, address]
          })
      }}>Buy</Button>
export default function Orders({ exchangeAddress, buy }) {
  const contractConfig = {
    address: exchangeAddress,
    abi: TradeClaims.abi,
  }

  const { data, fetchNextPage, refetch } = useContractInfiniteReads({
    cacheKey: buy ? 'buy' : 'sell',
    ...paginatedIndexesConfig(
      (param = 0) => {
        return [
          { ...contractConfig, functionName: buy ? 'buyOfferIndex' : 'sellOfferIndex', args: [param] },
        ]
      },
      { start: 0, perPage: 10, direction: 'increment' },
    ),
  })

  return (
    <Card title={buy ? "Buy Orders" : "Sell Orders"}>
      <Button onClick={refetch}>Refresh</Button>
      {
        data?.pages ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{buy ? "Buyer" : "Seller"}</th>
                <th>ID</th>
                <th>Ether</th>
                <th>kWh</th>
              </tr>
            </thead>
            <tbody>
              {data.pages.map((page, i) => (
                <React.Fragment key={1000 + i}>
                  {page.map((item, j) => (
                    item.status === 'success' ? (
                      <Order key={j} user={item.result[0]} orderId={item.result[1].toString()} buy={buy} exchangeAddress={exchangeAddress} />
                    ) : null
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )
        : null
      }
    </Card>
  )
}
*/