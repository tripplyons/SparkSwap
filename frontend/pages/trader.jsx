import Nav from '../components/Nav';
import Head from 'next/head';
import CancelSellRequest from '../components/CancelSellRequest';
import CreateSellRequest from '../components/CreateSellRequest';
import { useContractReads } from 'wagmi'
import TradeClaims from '../src/contracts/TradeClaims.json'
import Auction from '../src/contracts/Auction.json'
import ClaimToken from '../src/contracts/ClaimToken.json'
import TokenIssuer from '../src/contracts/TokenIssuer.json'
import Balance from '../components/Balance';
import { useState, useEffect } from 'react';

export default function Trader() {
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
        args: [0]
      },
      {
        ...contract,
        functionName: 'getAuction',
        args: [0],
      },
      {
        ...contract,
        functionName: 'getTradeClaims',
        args: [0],
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
      <Nav />
      {
        data ? (
          <>
            <div className="flex gap-4">
              <Balance tokenAddress={data[0].result} />
              <CancelSellRequest exchangeAddress={data[2].result} />
              <CreateSellRequest tokenAddress={data[0].result} exchangeAddress={data[2].result} />
            </div>
          </>
        ) : null
      }
    </div>
  );
}
