import Nav from '../components/Nav';
import Head from 'next/head';
import CancelRequest from '../components/CancelRequest';
import CreateRequest from '../components/CreateRequest';
import AcceptRequest from '../components/AcceptRequest';
import { useContractReads } from 'wagmi'
import TradeClaims from '../src/contracts/TradeClaims.json'
import Auction from '../src/contracts/Auction.json'
import ClaimToken from '../src/contracts/ClaimToken.json'
import TokenIssuer from '../src/contracts/TokenIssuer.json'
import Balance from '../components/Balance';
import { useState, useEffect } from 'react';
import OrdersTable from '../components/OrdersTable';

export default function TraderInterface({index}) {
  const contract = {
    abi: TokenIssuer.abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  }

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded && typeof window !== 'undefined') {
      setLoaded(true);
    }
  }, [loaded]);

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: 'getToken',
        args: [index]
      },
      {
        ...contract,
        functionName: 'getAuction',
        args: [index],
      },
      {
        ...contract,
        functionName: 'getTradeClaims',
        args: [index],
      },
      {
        ...contract,
        functionName: 'getEnergyType',
        args: [index],
      }
    ],
  })

  if (!loaded) {
    return null
  }

  return (
    <div>
      <Head>
        <title>SparkSwap</title>
        <meta
          content="SparkSwap website"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {
        data ? (
          <div className="px-8">
            <Balance energyType={data[3].result} tokenAddress={data[0].result} />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <CancelRequest exchangeAddress={data[2].result} buy={false} />
              <CreateRequest tokenAddress={data[0].result} buy={false} exchangeAddress={data[2].result} />
              <div className="col-span-2">
                <OrdersTable tokenAddress={data[0].result} exchangeAddress={data[2].result} buy={false} />
              </div>
              <CancelRequest exchangeAddress={data[2].result} buy={true} />
              <CreateRequest tokenAddress={data[0].result} exchangeAddress={data[2].result} buy={true} />
              <div className="col-span-2">
                <OrdersTable tokenAddress={data[0].result} exchangeAddress={data[2].result} buy={true} />
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  );
}
