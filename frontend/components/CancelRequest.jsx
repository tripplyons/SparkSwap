import Button from './Button';
import Input from './Input';

import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import TradeClaims from '../src/contracts/TradeClaims.json'
import Card from './Card';
import ethers from 'ethers';

export default function CancelRequest({ exchangeAddress, buy }) {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: exchangeAddress,
    abi: TradeClaims.abi,
    functionName: buy ? 'cancelBuyOffer' : 'cancelSellOffer',
  })

  const [id, setId] = useState("");

  return (
    <Card title={buy ? "Cancel Buy Order" : "Cancel Sell Order"}>
      <Input
        onChange={(e) => {
          setId(e.target.value)
        }}
        value={id}
        label="Order ID"
      />
      <Button onClick={() => write({args: [id]})}>Feed</Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Success</div>}
    </Card>
  )
}
