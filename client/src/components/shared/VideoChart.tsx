import React from 'react'
import { Chart } from 'react-google-charts'
import { ChartProps } from '../../types'

export const VideoChart = (props: ChartProps) => {
  return (
    <Chart
      chartType="Bar"
      data={[props.chartData.labels, ...props.chartData.data]}
      options={{
        chartArea: {
          width: '80%'
        },
        animation: {
          duration: 1500,
          easing: 'out',
          startup: true
        },
        hAxis: {
          title: 'Dates'
        },
        vAxis: {
          title: 'Uploads',
          minValue: 0
        }
      }}
    />
  )
}
