import React, { useMemo } from 'react'
import { Chart } from 'react-google-charts'
import { ChartProps } from '../../types'

export const VideoChart = (props: ChartProps) => {
  return (
    <Chart
      chartType="ColumnChart"
      data={[props.chartData.labels, ...props.chartData.data]}
      options={{
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
