import { useEffect, useState } from "react"
import { getTrendingVideos } from "../service"
import type { VideoListResponse } from "../service/type"
import { useCategoryIdStore } from "../stores/useVideoStore"

const Home = () => {
    const [videos, setVideos] = useState<VideoListResponse["items"]>([])
    const categoryId = useCategoryIdStore((state) => state.categoryId);


    useEffect(() => {
      getTrendingVideos(categoryId)
        .then(data => setVideos(data.items));
    }, [categoryId]);
 
    console.log('Current Category ID:', useCategoryIdStore.getState().categoryId);


    return (
        <>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6 mt-5">
                {videos.map((video, idx) => (
                    <figure className=" cursor-pointer hover:opacity-80 transition-all" key={idx}>
                        <img
                            className="object-cover object-center aspect-video"
                            src={video.snippet.thumbnails.standard.url}
                            alt=""
                        />
                    </figure>
                ))}
            </div>
        </>
    )

}

export default Home