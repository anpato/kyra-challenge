import React, { Component } from 'react'
import { AppState } from '../types'
import { subscribeToFeed, LoadVideos, GetWeeklyUploadStats } from '../services'
import { Card, VideoChart, StatChart } from './shared'
import Loader from 'react-loader-spinner'
import { pusher } from '../config/PusherConfig'

export default class Wrapper extends Component<{}, AppState> {
  state: AppState = {
    channelInfo: [],
    targetedIndex: null,
    nextPage: '',
    stats: null,
    isClosed: true,
    currentPage: 1,
    maxPage: 0,
    uploadData: {},
    isLoading: true,
    loadingMessage: 'Connecting',
    closeMessage: false
  }

  componentDidMount() {
    this.setState({ loadingMessage: 'Connecting' })
    this.fetchVideos()
    this.fetchWeeklyUploads()
    this.createPusher()
  }

  createPusher = () => {
    const channel = pusher.subscribe('subscribe')
    channel.bind('videos', (resp: any) => {
      this.setSubscriptions(resp)
    })
  }

  setSubscriptions = (res: any) => {
    if (res?.data) {
      const keys = Object.keys(res.data)
      switch (true) {
        case keys.includes('video'):
          this.setState(state => ({
            channelInfo: [res.data.video, ...state.channelInfo]
          }))
        case keys.includes('uploads'):
          this.setState(state => ({
            uploadData: res.data.uploads
          }))
      }
    }
  }

  fetchWeeklyUploads = async () => {
    try {
      const uploadData = await GetWeeklyUploadStats()
      this.setState({ uploadData, isLoading: false })
      await subscribeToFeed()
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
    this.setState({ targetedIndex: null, isClosed: true, stats: null })
  }

  renderVideos = () => (
    <Card
      videos={this.state.channelInfo}
      displayStats={this.getVideoStats}
      clearStats={this.closeStats}
      selectedIndex={this.state.targetedIndex}
    />
  )

  renderStats = () => {
    if (this.state.stats) {
      const { stats } = this.state
      return <StatChart chartData={stats} />
    }
    return <h2>Select A Video To View Statistics</h2>
  }

  displayButton = () => {
    const { maxPage, currentPage } = this.state
    return maxPage === currentPage ? (
      <button className="icon danger">
        <p> No Videos</p>
      </button>
    ) : (
      <button className="icon" onClick={this.loadAdditionalVideos}>
        <p>Load More</p>
      </button>
    )
  }

  toggleOpen = (param: boolean) => this.setState({ isClosed: param })

  renderPage = () => {
    const { isClosed } = this.state
    if (!this.state.isLoading) {
      return (
        <div className="wrapper">
          <div className="chart-wrapper">
            <div className="chart">
              <VideoChart chartData={this.state.uploadData} />
            </div>
            <div className="chart">{this.renderStats()}</div>
          </div>

          <div className="card-wrapper">
            {this.displayButton()}
            {this.renderVideos()}
          </div>
        </div>
      )
    } else {
      return (
        <div className="tmp-wrapper">
          <div>
            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
            <h3>Loading Kyra</h3>
          </div>
        </div>
      )
    }
  }

  render() {
    return this.renderPage()
  }
}
