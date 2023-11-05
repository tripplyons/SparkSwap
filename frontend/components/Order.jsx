import { useContractRead } from "wagmi";

import { formatUnits } from 'ethers';

import TradeClaims from '../src/contracts/TradeClaims.json'

export default function Order({buy, exchangeAddress, orderId, user}) {
  const { data, isError, isLoading } = useContractRead({
    address: exchangeAddress,
    abi: TradeClaims.abi,
    functionName: buy ? 'buyOffers' : 'sellOffers',
    args: [user, orderId]
  })
  return (
    <tr>
      <td>{user}</td>
      <td>{orderId}</td>
      <td>{data && (data[1] !== null ? formatUnits(data[1], 18) : null)}</td>
      <td>{data && (data[0] !== null ? formatUnits(data[0], 18) : null)}</td>
    </tr>
  )
}
