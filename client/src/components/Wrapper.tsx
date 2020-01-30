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
    channelInfo: [],
    nextPage: ''
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
    channel.bind('new-videos', (resp: any) =>
      this.setState({
        channelInfo: resp.data.videos,
        nextPage: resp.data.nextPageToken
      })
    )
  }

  fetchVideos = async () => {
    try {
      await subscribeToFeed()
    } catch (error) {
      throw error
    }
  }

  renderVideos = () => {
    if (this.state.channelInfo.length) {
      return this.state.channelInfo.map(video => {
        return (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <img src={video.thumbnail} alt={video.title} />
          </div>
        )
      })
    }
  }

  render() {
    return <div>{this.renderVideos()}</div>
  }
}
