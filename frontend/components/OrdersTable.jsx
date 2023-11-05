import Button from './Button';
import Input from './Input';
import Order from './Order';
import { formatUnits } from 'ethers';
import { useContractWrite, useContractInfiniteReads, paginatedIndexesConfig } from 'wagmi'
import TradeClaims from '../src/contracts/TradeClaims.json'
import ClaimToken from '../src/contracts/ClaimToken.json'
import Card from './Card';
import React from 'react';

export default function Orders({ tokenAddress, exchangeAddress, buy }) {
  const contractConfig = {
    address: exchangeAddress,
    abi: TradeClaims.abi,
  }

  const approveToken = useContractWrite({
    address: tokenAddress,
    abi: ClaimToken.abi,
    functionName: 'approve',
  })


  const { data, fetchNextPage, refetch } = useContractInfiniteReads({
    cacheKey: buy ? 'buy' : 'sell',
    ...paginatedIndexesConfig(
      (param = 0) => {
        console.log(contractConfig);
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
        buy ? (
          <Button onClick={() => {
            approveToken.write({
              args: [exchangeAddress, "1" + "0".repeat(27)],
            })
          }}>Approve</Button>
        ) : null
      }
      {
        data?.pages ? (
          <table className="table w-full border">
            <thead>
              <tr className="border border-black">
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
