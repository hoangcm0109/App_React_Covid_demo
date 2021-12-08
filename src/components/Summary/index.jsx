import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HighMaps from '../Chart/HighMaps'
import LineChart from '../Chart/LineChart'

export default function Summary({ report, selectedCountryID }) {
    const [mapData, setMapData] = useState({})

    useEffect(() => {
        if(selectedCountryID) {
            import(`@highcharts/map-collection/countries/${selectedCountryID}/${selectedCountryID}-all.geo.json`)
                .then(res => {
                    setMapData(res)
                })
        } 
        
    }, [selectedCountryID])

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart data={report} />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HighMaps mapData={mapData} />
                </Grid>
            </Grid>
        </div>
    )
}
