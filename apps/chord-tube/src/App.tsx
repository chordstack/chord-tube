import { useEffect, useState } from "react"
import { getTrendingVideos } from "./service"
import type { VideoListResponse } from "./service/type"

function App() {
  const [videos, setVideos] = useState<VideoListResponse["items"]>([])

  useEffect(() => {
    getTrendingVideos()
      .then(data => setVideos(data.items))
  }, [])

  return (
    <>
      <ol>
        {videos.map((video, idx) => {
          return <li key={idx}>{video.snippet.title}</li>
        })}
      </ol>
    </>
  )
}

export default App
