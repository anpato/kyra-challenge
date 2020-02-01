export interface AppState {
  channelInfo: any[]
  nextPage: string
  stats: any
  isClosed: boolean
  targetedIndex: number | null
  currentPage: number
  maxPage: number
}

export interface CardProps {
  children: React.ReactElement[]
}

export interface ChartProps {
  chartData: any[]
}
