import React from 'react'
import { CardProps } from '../../types'

export const Card = (props: CardProps) => {
  return <div className="card">{props.children}</div>
}
