import Button from './Button';
import Input from './Input';

import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import TradeClaims from '../src/contracts/TradeClaims.json'
import Card from './Card';
import ethers from 'ethers';

export default function CancelSellRequest({ exchangeAddress }) {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: exchangeAddress,
    abi: TradeClaims.abi,
    functionName: 'cancelSellOffer',
  })

  const [id, setId] = useState("");

  return (
    <Card title="Cancel Sell Order">
      <Input
        onChange={(e) => {
          setId(e.target.value)
        }}
        value={id}
        label="ID"
      />
      <Button onClick={() => write({args: [id]})}>Feed</Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Success</div>}
    </Card>
  )
}
