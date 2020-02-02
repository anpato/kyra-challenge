export interface AppState {
  channelInfo: any[]
  nextPage: string
  stats: any
  isClosed: boolean
  targetedIndex: number | null
  currentPage: number
  maxPage: number
  uploadData: any
  isLoading: boolean
  additionalLoading: boolean
}

export interface CardProps {
  videos: any
  displayStats: Function
  selectedIndex: number | null
  clearStats: Function
}

export interface ChartProps {
  chartData: any
}

export interface ChartData {
  labels: string[]
  data: any[]
}
