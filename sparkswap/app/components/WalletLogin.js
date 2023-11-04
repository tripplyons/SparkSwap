import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

export default function WalletLogin() {
    return (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={8}>
            <Box className="walletDisplay">
                SparkSwap
            </Box>
            <Button className="walletButton" variant="solid" sx={{
                width: '20',
                display: 'flex',
                flexDirection: 'row'
            }}>
                Bruh
            </Button>
        </Grid></Grid>
    );
}
  
