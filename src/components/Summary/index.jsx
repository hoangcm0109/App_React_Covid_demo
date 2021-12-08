import { Grid } from '@mui/material'
import React from 'react'
import LineChart from '../Chart/LineChart'

export default function Summary({ data }) {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart data={[]} />
                </Grid>
                <Grid item sm={4} xs={12}>

                </Grid>
            </Grid>
        </div>
    )
}
