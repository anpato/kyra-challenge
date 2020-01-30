import React, { Component } from 'react'
import { AppState } from '../types'
import { subscribeToFeed } from '../services'
import Pusher from 'pusher-js'
const {
  REACT_APP_PUSHER_ID,
  REACT_APP_PUSHER_KEY,
  REACT_APP_PUSHER_SECRET,
  REACT_APP_PUSHER_CLUSTER
} = process.env
export default class Wrapper extends Component<{}, AppState> {
  state: AppState = {
    channelInfo: []
  }

  componentDidMount() {
    this.fetchVideos()
    this.createPusher()
  }

  createPusher = () => {
    const pusher = new Pusher(REACT_APP_PUSHER_KEY, {
      appId: REACT_APP_PUSHER_ID,
      secret: REACT_APP_PUSHER_SECRET,
      cluster: REACT_APP_PUSHER_CLUSTER,
      useTLS: true
    })
    const channel = pusher.subscribe('subscribe')
    channel.bind('new-videos', (data: any[]) => console.log(data))
  }

  fetchVideos = async () => {
    try {
      const channelInfo = await subscribeToFeed()
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
