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
import TraderInterface from '../components/TraderInterface';

export default function Trader() {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <select onChange={(e) => setIndex(e.target.value)}>
        <option value={0}>0</option>
        <option value={1}>1</option>
      </select>
      <TraderInterface index={index} />
    </div>
  );
}
