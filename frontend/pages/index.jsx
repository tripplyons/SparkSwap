import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import LogoDisplayer from './logoDisp.jsx'
const Home = () => {
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
      <div id="header" class="flex 10vh bg-gray-200 mb-5">
        <div class="m-4 flex-initial m-auto" >
          <div class="ml-4">
            <LogoDisplayer/>
          </div>
        </div>
        <div class="flex-1"></div>
        <div class="m-4 flex-initial align-middle" >
          <ConnectButton/>
        </div>
      </div>
      <div id="body" class="h-full">
        <div class="overflow-y-scroll">

        </div>
      </div>
    </div>
  );
};

export default Home;
