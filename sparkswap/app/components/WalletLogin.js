'use client'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Sheet';
import Sheet from '@mui/material/Sheet';



export default function WalletLogin() {
    return (
            <div>
              <Stack direction="row" spacing={24}>
                <Sheet xs={2}>Item 1</Sheet>
                <Sheet xs={2}>Item 2</Sheet>
                <Sheet xs={2}>Item 3</Sheet>
              </Stack>
            </div>
    );
}
  