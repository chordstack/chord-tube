import { Link } from "react-router-dom";
import type { VideoListItem } from "../service/type";
import moment from "moment";
import { Box } from "@mui/material";
import { viewConverter } from "../constants/categoryMap";

interface CardProps {
    video: VideoListItem;
    idx: number;
    badgeNumber?: number;
    isSearchMode?: boolean
}

export default function Card({ video, idx, badgeNumber, isSearchMode }: CardProps) {
    const formattedDate = moment(video.snippet.publishedAt).fromNow();

    const videoId = typeof video.id === "string" ? video.id : video.id?.videoId;

    return (
        <Link
            to={`/detail/${videoId}`}
            className="cursor-pointer group transition-all flex flex-col gap-1 relative overflow-hidden"
            key={idx}
        >
            {badgeNumber !== undefined && (
                <Box
                    className="absolute -top-2 -right-2 bg-red-500/90 text-white/87 rounded-bl-[30px] md:w-16 md:h-16 w-14 h-14 flex justify-center items-center font-semibold lg:text-3xl md:text-2xl text-xl shadow-md select-none z-10">
                    {badgeNumber}
                </Box>
            )}

            <img
                className="object-cover caret-transparent object-center aspect-video group-hover:opacity-70 transition-all"
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
            />
            <h1 className="line-clamp-2 md:text-lg font-medium leading-tight">
                {video.snippet.title}
            </h1>
            <div className="flex justify-between items-center text-xs text-gray-300">
                <p className="font-medium md:text-md text-sm text-gray-200">
                    {video.snippet.channelTitle}
                </p>
                <p>{!isSearchMode && <> <span>{viewConverter(video.statistics.viewCount)} views</span>  <span className="ml-1 mr-2">|</span></>}<span>{formattedDate}</span></p>
            </div>
        </Link>
    );
}
