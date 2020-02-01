import React, { useMemo } from 'react'
import { Chart } from 'react-charts'
import { ChartProps } from '../../types'
export const VideoChart = (props: ChartProps) => {
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
  return <Chart axes={axes} />
}
