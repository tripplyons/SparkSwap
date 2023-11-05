import { useContractRead } from "wagmi";

import { formatUnits } from 'ethers';

import TradeClaims from '../src/contracts/TradeClaims.json'
import AcceptRequest from "./AcceptRequest";

export default function Order({buy, tokenAddress, exchangeAddress, orderId, user}) {
  const { data, isError, isLoading } = useContractRead({
    address: exchangeAddress,
    abi: TradeClaims.abi,
    functionName: buy ? 'buyOffers' : 'sellOffers',
    args: [user, orderId]
  })
  return (
    <tr className="border border-black">
      <td>{user}</td>
      <td>{orderId}</td>
      <td>{data && (data[1] !== null ? formatUnits(data[1], 18) : null)}</td>
      <td>{data && (data[0] !== null ? formatUnits(data[0], 18) : null)}</td>
      <td>
        <AcceptRequest
          buy={buy}
          exchangeAddress={exchangeAddress}
          tokenAddress={tokenAddress}
          id={orderId}
          address={user}
          etherAmount={data && (data[1] !== null ? formatUnits(data[1], 18) : null)}
        />
      </td>
    </tr>
  )
}
