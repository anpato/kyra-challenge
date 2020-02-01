import React, { Component } from 'react'
import { AppState } from '../types'
import { subscribeToFeed, LoadVideos, GetWeeklyUploadStats } from '../services'
import Pusher from 'pusher-js'
import { Card } from './shared'
import { VideoChart } from './shared/Chart'
const {
  REACT_APP_PUSHER_ID,
  REACT_APP_PUSHER_KEY,
  REACT_APP_PUSHER_SECRET,
  REACT_APP_PUSHER_CLUSTER
} = process.env
export default class Wrapper extends Component<{}, AppState> {
  state: AppState = {
    channelInfo: [],
    targetedIndex: null,
    nextPage: '',
    stats: {},
    isClosed: true,
    currentPage: 1,
    maxPage: 0,
    uploadData: {}
  }

  componentDidMount() {
    this.fetchVideos()
    this.fetchWeeklyUploads()
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
    channel.bind(
      'videos',
      (resp: any) => console.log(resp)
      // this.setState({
      //   channelInfo: resp.data.videos
      //   // nextPage: resp.data.nextPage
      // })
    )
  }

  fetchWeeklyUploads = async () => {
    try {
      const uploadData = await GetWeeklyUploadStats()
      this.setState({ uploadData })
    } catch (error) {
      throw error
    }
  }

  fetchVideos = async () => {
    try {
      const channelInfo = await LoadVideos(this.state.currentPage)

      this.setState(state => ({
        channelInfo: channelInfo.data,
        maxPage: channelInfo.pages
      }))
      await subscribeToFeed()
    } catch (error) {
      throw error
    }
  }

  loadAdditionalVideos = () => {
    if (this.state.currentPage !== this.state.maxPage)
      this.setState(
        (state: AppState) => ({ currentPage: state.currentPage + 1 }),
        async () => {
          try {
            const additionalVideos = await LoadVideos(this.state.currentPage)
            this.setState((state: AppState) => ({
              channelInfo: [...additionalVideos.data, ...state.channelInfo],
              maxPage: additionalVideos.pages
            }))
          } catch (error) {}
        }
      )
  }

  getVideoStats = (index: number) => {
    this.toggleOpen(false)
    this.setState((state: AppState) => {
      state.stats = state.channelInfo[index].stats
      state.targetedIndex = index
      return state
    })
  }

  closeStats = () => {
    this.setState({ targetedIndex: null, isClosed: true })
  }

  renderVideos = () => {
    if (this.state.channelInfo.length) {
      return this.state.channelInfo.map((video, index) => {
        return (
          <Card key={video._id}>
            <div className="text-wrapper">
              <h3>{video.title}</h3>
            </div>
            <div className="image-wrapper">
              <img src={video.thumbnail} alt={video.title} />
            </div>
            <button
              onClick={() =>
                this.state.targetedIndex === index
                  ? this.closeStats()
                  : this.getVideoStats(index)
              }
            >
              {this.state.targetedIndex === index
                ? 'Close Stats'
                : 'View Stats'}
            </button>
          </Card>
        )
      })
    }
  }

  renderStats = () => {
    if (Object.keys(this.state.stats).length) {
      const { stats } = this.state
      return (
        <div className="stat-info">
          <div className="box-wrapper">
            <h3>Comments</h3>
            <p>{stats.commentCount}</p>
          </div>
          <div className="box-wrapper">
            <h3>Likes</h3>
            <p>{stats.commentCount}</p>
          </div>
          <div className="box-wrapper">
            <h3>Views</h3>
            <p>{stats.viewCount}</p>
          </div>
        </div>
      )
    }
  }

  displayButton = () => {
    const { maxPage, currentPage } = this.state
    if (maxPage === currentPage) {
      return (
        <button className="icon danger">
          <p> No Videos</p>
        </button>
      )
    } else {
      return (
        <button className="icon" onClick={this.loadAdditionalVideos}>
          <p>Load More</p>
        </button>
      )
    }
  }

  toggleOpen = (param: boolean) => this.setState({ isClosed: param })

  render() {
    const { isClosed } = this.state
    return (
      <div className="wrapper">
        {Object.keys(this.state.uploadData).length ? (
          <VideoChart chartData={this.state.uploadData} />
        ) : null}
        <aside
          className={isClosed ? `stat-wrapper closed` : `stat-wrapper open`}
        >
          {this.renderStats()}
        </aside>
        {this.displayButton()}
        <div className="card-wrapper">{this.renderVideos()}</div>
      </div>
    )
  }
}
