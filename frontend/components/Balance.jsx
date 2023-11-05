import Button from './Button';
import Input from './Input';

import { formatUnits } from 'ethers';
import { useState } from 'react';
import { useContractRead, useAccount } from 'wagmi'
import ClaimToken from '../src/contracts/ClaimToken.json'
import Card from './Card';

export default function Balance({ energyType, tokenAddress }) {
  const { address, isConnecting, isDisconnected } = useAccount()

  const balance = useContractRead({
    address: tokenAddress,
    abi: ClaimToken.abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true
  })
  const name = useContractRead({
    address: tokenAddress,
    abi: ClaimToken.abi,
    functionName: 'name',
  })

  const [id, setId] = useState("");

  return (
    <Card title="Balance">
      {balance.data ? formatUnits(balance.data, 18) : (
        balance.data === 0n ? "0" : null
      )}
      {" "}
      {name.data && name.data}
      <div>
        <b className="text-bold">Energy Type:</b> {energyType}
      </div>
    </Card>
  )
}
