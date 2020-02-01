export interface AppState {
  channelInfo: any[]
  nextPage: string
  stats: any
  isClosed: boolean
  targetedIndex: number | null
  currentPage: number
  maxPage: number
  uploadData: any
}

export interface CardProps {
  children: React.ReactElement[]
}

export interface ChartProps {
  chartData: ChartData
}

export interface ChartData {
  labels: string[]
  data: any[]
}
