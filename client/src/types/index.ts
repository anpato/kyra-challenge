export interface AppState {
  channelInfo: any[]
  nextPage: string
  stats: any
  isClosed: boolean
  targetedIndex: number | null
}

export interface CardProps {
  children: React.ReactElement[]
  // onClick: (event: React.MouseEvent<HTMLElement>) => void
}
