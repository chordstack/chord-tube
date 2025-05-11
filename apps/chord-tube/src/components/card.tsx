import type { CardProps } from "../service/type";
import moment from "moment";





export default function Card({ video, idx }: CardProps) {
    const formattedDate = moment(video.snippet.publishedAt).fromNow();
    return (
        <figure className="cursor-pointer group transition-all flex flex-col gap-1 " key={idx}>
            <img
                className="object-cover caret-transparent object-center aspect-video group-hover:opacity-70 transition-all"
                src={video.snippet.thumbnails.high.url}
            />
            <div></div>
            <h1 className=" line-clamp-2 md:text-lg font-medium leading-tight">{video.snippet.title}</h1>
            <p className=" font-medium sm:text-sm text-gray-200 ">
                {video.snippet.channelTitle}
            </p>
            <div className="  flex justify-between text-xs text-gray-300">
                <p className=" flex items-center ">
                    {viewConverter(video?.statistics?.viewCount)} views{" "}
                </p>
                <p>{formattedDate}</p>
            </div>
        </figure>
    );

}

export const viewConverter = (value: number) => {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + "K";
    } else {
        return value;
    }
};