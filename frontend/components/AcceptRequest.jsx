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

  return (
    <Card title={buy ? "Accept Buy Order" : "Accept Sell Order"}>
      <Input
        onChange={(e) => {
          setAddress(e.target.value)
        }}
        value={address}
        label={buy ? "Buyer Address": "Seller Address"}
      />
      <Input
        onChange={(e) => {
          setId(e.target.value)
        }}
        value={id}
        label="Order ID"
      />
      {
        buy ? null : (
          <Input
            onChange={(e) => {
              setEtherAmount(e.target.value)
            }}
            value={etherAmount}
            label="Ether Amount"
          />
        )
      }
      {
        buy ? (
          <Button onClick={() => {
            approveToken.write({
              args: [exchangeAddress, "1" + "0".repeat(27)],
            })
          }}>Approve</Button>
        ) : null
      }
      <Button onClick={() => {
        if (buy) {
          write({
            args: [id, address]
          })
        } else {
          write({
            args: [id, address],
            value: parseEther(etherAmount)
          })
        }
      }}>Buy</Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Success</div>}
    </Card>
  )
}
