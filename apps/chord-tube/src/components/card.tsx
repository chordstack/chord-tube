import { Link } from "react-router-dom";
import type { CardProps } from "../service/type";
import moment from "moment";

export default function Card({ video, idx }: CardProps) {
    const formattedDate = moment(video.snippet.publishedAt).fromNow();

    const videoId = typeof video.id === "string" ? video.id : video.id?.videoId;

    return (
        <Link
            to={`/detail/${videoId}`}
            className="cursor-pointer group transition-all flex flex-col gap-1"
            key={idx}
        >
            <img
                className="object-cover caret-transparent object-center aspect-video group-hover:opacity-70 transition-all"
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
            />
            <h1 className="line-clamp-2 md:text-lg font-medium leading-tight">
                {video.snippet.title}
            </h1>
            <div className="flex justify-between text-xs text-gray-300">
                <p className="font-medium md:text-md text-sm text-gray-200">
                    {video.snippet.channelTitle}
                </p>
                <p>{formattedDate}</p>
            </div>
        </Link>
    );
}
