import { Box, Grid } from '@mui/material';
import Profits from './Profits';

import TopProfitableProducts from './TopProfitableProducts';
import CompletedOrders from './CompletedOrders';

export default function Statistic() {
    return (
        <Box sx={{ width: '100vw', height: '100vh' , fontFamily: "sans-serif", background: '#22c2b284'}}>
            <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '2em' }}>
                <Grid item xs={12} sx={{ height: '45vh', display: 'flex', justifyContent: 'center' }}>
                    <Profits/>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ height: '45vh', display: 'flex', justifyContent: 'center' }}>
                        <TopProfitableProducts/>
                        </Box>
                </Grid>
                <Grid item xs={6} sx={{marginLeft:'-5em'}}>
                    <Box sx={{ height: '45vh', display: 'flex', justifyContent: 'center' }}>
                        <CompletedOrders/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}











