import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import LogoNail from '@/app/components/logoNail';
import WalletLogin from '@/app/components/WalletLogin';
import Input from '@mui/joy/Input';

export default function Neat() {
  return (
    <Box sx={{
        py: 2,
        px: 2,
        my: 2,
        mx: 2,
        width: "100%",
        background: 'red'
    }}>
        <LogoNail variant="solid"></LogoNail>
        <WalletLogin variant="solid"></WalletLogin>
    </Box>
  );
}
