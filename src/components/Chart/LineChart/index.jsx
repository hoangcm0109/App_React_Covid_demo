import React, { useEffect, useState } from 'react'
import HighChartReact from 'highcharts-react-official'
import HighChart from 'highcharts'
import moment from 'moment';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';

const generateOptions = (data) => {

    const categories = data.map(item => moment(item.Date).format('DD/MM/YYYY'))

    return {
        chart: {
            height: 500,
        },
            title: {
            text: 'Tổng ca nhiễm',
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#F3585B'],
        yAxis: {
        min: 0,
        title: {
            text: null,
        },
        labels: {
            align: 'right',
        },
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Tổng Ca nhiễm',
                data: data.map((item) => item.Confirmed),
            },
        ],
    };
}

const LineChart = ({ data }) => {

    const [options, setOptions] = useState({})
    const [reportType, setReportType] = useState('all')

    console.log(reportType);

    useEffect(() => {
        let customData = []
        switch (reportType) {
            case 'all':
                customData = data
                break
            case '30':
                customData = data.slice(data.length - 30)
                break
            case '7':
                customData = data.slice(data.length - 7)
                break
            default:
                customData = data
                break;
        }
        setOptions(generateOptions(customData))
    }, [data, reportType])

    return (
        <div>
            <ButtonGroup size="small" style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button  onClick={() => setReportType('all')} >All</Button>
                <Button  onClick={() => setReportType('30')} >30 days</Button>
                <Button  onClick={() => setReportType('7')} >7 days</Button>
            </ButtonGroup>
            <HighChartReact
                highcharts={HighChart}
                options={options}
            />
        </div>
    )
}

export default React.memo(LineChart)