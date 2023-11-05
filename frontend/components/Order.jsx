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
    <tr className="border border-gray-400">
      <td className="p-2">{user}</td>
      <td className="p-2">{orderId}</td>
      <td className="p-2">{data && (data[1] !== null ? formatUnits(data[1], 18) : null)}</td>
      <td className="p-2">{data && (data[0] !== null ? formatUnits(data[0], 18) : null)}</td>
      <td className="p-2">
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
