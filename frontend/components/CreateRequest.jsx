import Button from './Button';
import Input from './Input';

import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import TradeClaims from '../src/contracts/TradeClaims.json'
import ClaimToken from '../src/contracts/ClaimToken.json'
import Card from './Card';

export default function CreateRequest({ buy, tokenAddress, exchangeAddress }) {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: exchangeAddress,
    abi: TradeClaims.abi,
    functionName: buy ? 'createBuyOffer' : 'createSellOffer',
  })

  const [id, setId] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [etherAmount, setEtherAmount] = useState("");

  const approveToken = useContractWrite({
    address: tokenAddress,
    abi: ClaimToken.abi,
    functionName: 'approve',
  })

  return (
    <Card title={buy ? "Create Buy Order" : "Create Sell Order"}>
      <Input
        onChange={(e) => {
          setId(e.target.value)
        }}
        value={id}
        label="Order ID"
      />
      <Input
        onChange={(e) => {
          setTokenAmount(e.target.value)
        }}
        value={tokenAmount}
        label="Token Amount"
      />
      <Input
        onChange={(e) => {
          setEtherAmount(e.target.value)
        }}
        value={etherAmount}
        label="Ether Amount"
      />
      {
        buy ? null : (
          <Button onClick={() => {
            approveToken.write({
              args: [exchangeAddress, "1" + "0".repeat(27)],
            })
          }}>Approve</Button>
        )
      }
      <Button onClick={() => {
        let value = parseFloat(etherAmount) * 10 ** 9;
        value = value.toString() + "000000000";
        let tokens = parseFloat(tokenAmount) * 10 ** 9;
        tokens = tokens.toString() + "000000000";

        write({
          args: [id, tokens],
          value: value
        })
      }}>Create</Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Success</div>}
    </Card>
  )
}
