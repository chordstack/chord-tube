import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import DescriptionToggle from "./showmoreToggle";
import SubscribeButton from "./subscribeButton";
import {
    GetApp,
    ThumbDownOffAlt,
    ThumbUpAlt,
    TurnedInNot,
} from "@mui/icons-material";
import { useSearchStore } from "../stores/useVideoStore";
import { CommentSection } from "./commentSection";
import { viewConverter } from "../service";

const DetailCard = ({ video, channel, id }: any) => {
    const setQuery = useSearchStore((state) => state.setInput);
    const submitQuery = useSearchStore((state) => state.submitQuery);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    const thumbnail = video?.snippet?.thumbnails?.high?.url;

    return (
        <div className="p-4 md:col-span-3 w-full relative">
            {/* Ambient glow behind video */}
            {thumbnail && (
                <div
                    className="absolute top-0 left-0 w-full aspect-video -z-10 overflow-hidden rounded-lg"
                    style={{
                        backgroundImage: `url(${thumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(40px) brightness(0.6)",
                        transform: "scale(1.2)",
                    }}
                ></div>
            )}

            {/* Video player */}
            <div className="relative w-full aspect-video">
                {/* Ambient glow layer */}
                {video?.snippet?.thumbnails?.high?.url && (
                    <div
                        className="absolute inset-0 z-0 rounded-xl"
                        style={{
                            backgroundImage: `url(${video.snippet.thumbnails.high.url})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(80px) brightness(0.7) saturate(1.5)",
                            transform: "scale(1.2)",
                            opacity: 0.7,
                            transition: "all 0.5s ease-in-out",
                        }}
                    ></div>
                )}

                {/* Overlay to darken edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-xl" />

                <div className="relative w-full aspect-video">
                    {/* Actual Video */}
                    <iframe
                        className="w-full h-full relative z-20 rounded-xl"
                        src={`https://www.youtube.com/embed/${id}`}
                        frameBorder={0}
                        allowFullScreen
                        title="Video Player"
                    ></iframe>
                </div>

            </div>


            <h1 className="text-xl font-semibold mt-3 relative">{video?.snippet?.title}</h1>

            {channel && (
                <div className="flex items-center justify-between mt-2 mb-2 relative">
                    <div className="flex gap-4 items-center">
                        <Link to={`/channel/${channel.id}`}>
                            <div className="flex gap-4">
                                <img
                                    src={channel?.snippet?.thumbnails?.default?.url}
                                    alt={channel?.snippet?.title}
                                    className="rounded-full w-12 h-12"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {channel?.snippet?.title}
                                    </h2>
                                    <p className="text-sm text-gray-400">
                                        {viewConverter(channel?.statistics?.subscriberCount)} subscribers
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <SubscribeButton />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex items-center rounded-full">
                            <Button variant="text">
                                <ThumbUpAlt />
                                <span className="ml-1">
                                    {viewConverter(video?.statistics?.likeCount)}
                                </span>
                            </Button>
                            <Divider orientation="vertical" className="bg-gray-600 mx-1" />
                            <Button variant="text">
                                <ThumbDownOffAlt />
                            </Button>
                        </div>

                        <Button variant="text">
                            <TurnedInNot />
                            <span className="ml-1 lowercase">Save</span>
                        </Button>
                        <Button variant="text">
                            <GetApp />
                            <span className="ml-1 lowercase">Download</span>
                        </Button>
                    </div>
                </div>
            )}

            <div className="mt-2 text-md text-gray-100 font-medium">
                <p>
                    <span>{viewConverter(video?.statistics?.viewCount)} views</span>
                    <span className="ml-2">{video?.snippet?.publishedAt}</span>

                    {video?.snippet?.tags?.slice(0, 6).map((tag: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setQuery(tag);
                                submitQuery();
                            }}
                            className="ml-2 text-blue-400 cursor-pointer"
                        >
                            #{tag}
                        </button>
                    ))}
                </p>

                <DescriptionToggle description={video?.snippet?.description} />
                <CommentSection video={video} />
            </div>
        </div>
    );
};

export default DetailCard;
