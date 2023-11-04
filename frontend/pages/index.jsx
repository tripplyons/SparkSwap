import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';

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

      <ConnectButton />
    </div>
  );
};

export default Home;
