import React from 'react'
import { CardProps } from '../../types'

export const Card = (props: CardProps) => {
  return props.videos.map((video: any, index: number) => (
    <div
      className={`card ${
        props.selectedIndex === index ? 'selected' : 'not-selected'
      }`}
      key={video._id}
    >
      <div className="text-wrapper">
        <h3>{video.title}</h3>
      </div>
      <div className="image-wrapper">
        <img src={video.thumbnail} alt={video.title} />
      </div>
      <button
        onClick={
          props.selectedIndex === index
            ? () => props.clearStats()
            : () => props.displayStats(index)
        }
      >
        {props.selectedIndex === index ? 'Hide Stats' : 'View Stats'}
      </button>
    </div>
  ))
}
