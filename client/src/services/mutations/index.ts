export const __ParseChannelVideos = (channelData: any[]) => {
  return channelData.map((data, index) => {
    const parsedData = {
      id: data.id,
      publishDate: data.snippet.publishedAt,
      title: data.snippet.title,
      description: data.snippet.description,
      thumbnail: data.snippet.thumbnails.default.url,
      stats: data.statistics
    }
    return parsedData
  })
}
