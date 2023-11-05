import Button from './Button';
import Input from './Input';
import Order from './Order';
import { formatUnits } from 'ethers';
import { useContractInfiniteReads, paginatedIndexesConfig } from 'wagmi'
import TradeClaims from '../src/contracts/TradeClaims.json'
import Card from './Card';
import React from 'react';

export default function Orders({ exchangeAddress, buy }) {
  const contractConfig = {
    address: exchangeAddress,
    abi: TradeClaims.abi,
  }

  const { data, fetchNextPage, refetch } = useContractInfiniteReads({
    cacheKey: 'aksdfjalsdkfj',
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
    <Card title="Orders">
      <Button onClick={refetch}>Refresh</Button>
      {
        data?.pages ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Seller</th>
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
