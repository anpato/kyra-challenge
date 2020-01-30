import React, { Component } from 'react'
import { AppState } from '../types'
import { getData } from '../services'
export default class Wrapper extends Component<{}, AppState> {
  state: AppState = {
    channelInfo: []
  }

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async () => {
    try {
      const channelInfo = await getData()

      console.log(channelInfo)
    } catch (error) {
      throw error
    }
  }

  renderVideos = () => {
    if (this.state.channelInfo.length) {
      return this.state.channelInfo.map(videos => (
        <div key={videos.id.videoId}>
          <img
            src={videos.snippet.thumbnails.default.url}
            alt={videos.snippet.title}
          />
          <h3>{videos.snippet.title}</h3>
        </div>
      ))
    }
  }

  render() {
    return <div>{/* {this.renderVideos()} */}</div>
  }
}
