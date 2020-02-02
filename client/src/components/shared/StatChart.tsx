import React from 'react'
import { Chart } from 'react-google-charts'
import { ChartProps } from '../../types'

export const StatChart = (props: ChartProps) => {
  let stats = props.chartData
  const data = Object.keys(stats)
    .map(key => [key, parseInt(stats[key])])
    .sort((a, b): any => a[1] > b[1])

  const chartData = [['Stat', 'Amount'], ...data]
  console.log(chartData)
  return (
    <Chart
      chartType="AreaChart"
      data={chartData}
      options={{
        chartArea: {
          width: '50%'
        },
        animation: {
          duration: 200,
          easing: 'in',
          startup: true
        },
        hAxis: {
          title: 'Stats'
        },
        vAxis: {
          title: 'Amount',
          minValue: 0
        }
      }}
    />
  )
}
