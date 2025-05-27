import { Link } from "react-router-dom"

import moment from "moment"
import { Circle } from "@mui/icons-material"
import type { VideoListItem } from "../service/type"
import { viewConverter } from "../constants/categoryMap"


export const SuggestedCard = ({ video }: { video: VideoListItem }) => {
    const videoId = typeof video.id === "string" ? video.id : video.id?.videoId;
    return (
        <Link to={`/detail/${videoId}`} className="w-full grid grid-cols-2 gap-4 group">
            <figure className=" w-full">
                <img className="object-cover group-hover:opacity-70 transition-all rounded-lg w-full aspect-video" src={video.snippet.thumbnails.medium.url} alt="" />
            </figure>
            <div>
                <h1 className=" font-medium line-clamp-2">{video.snippet.title}</h1>
                <p className="text-sm text-gray-200">{video.snippet.channelTitle}</p>
                <p className=" text-xs text-gray-300 mt-4">
                    <span>{viewConverter(video.statistics?.viewCount)}</span>
                    <Circle sx={{ fontSize: "8px", marginX: "5px" }} />
                    <span>{moment(video.snippet?.publishedAt).fromNow()}</span>
                </p>
            </div>
        </Link>
    )
}
