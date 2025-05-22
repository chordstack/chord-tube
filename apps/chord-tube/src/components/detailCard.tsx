import { Link } from "react-router-dom"
import { Button, Divider, Fab } from "@mui/material"
import DescriptionToggle from "./showmoreToggle"
import SubscribeButton from "./subscribeButton"
import { GetApp, ThumbDownOffAlt, ThumbUpAlt, TurnedInNot } from "@mui/icons-material"
import { useSearchStore } from "../stores/useVideoStore"
import { CommentSection } from "./commentSection"
import { viewConverter } from "../service"

const DetailCard = ({ video, channel, id }: any) => {
    const setQuery = useSearchStore(state => state.setInput)
    const submitQuery = useSearchStore(state => state.submitQuery)

    return (
        <div className="p-4 md:col-span-3 w-full">
            <iframe
                className="w-full aspect-video caret-transparent"
                src={`https://www.youtube.com/embed/${id}`}
                frameBorder="0"
                allowFullScreen
                title="Video Player"
            ></iframe>
            <h1 className="text-xl font-semibold mt-3 ">{video?.snippet?.title}</h1>
            {/* Channel Info */}
            {channel && (
                <div className="flex items-center justify-between mt-2 mb-2">
                    <div className=" flex gap-4 items-center">
                        <Link to={`/channel/${channel.id}`}>
                            <div className=" flex gap-4">
                                <img
                                    src={channel?.snippet.thumbnails.default?.url}
                                    alt={channel?.snippet?.title}
                                    className="rounded-full w-12 h-12"
                                />
                                <div>
                                    <h2 className=" text-lg font-semibold">{channel?.snippet?.title}</h2>
                                    <p className="text-sm text-gray-400">
                                        {viewConverter(channel?.statistics?.subscriberCount)} subscribers
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <SubscribeButton />
                    </div>
                    <div className=" flex gap-2 ">
                        <div className=" flex  rounded-full ">
                            <Button variant="text" >
                                <ThumbUpAlt />
                                <span className=" ml-1">
                                    {viewConverter(video.statistics?.likeCount)}
                                </span>
                            </Button>
                            <Divider orientation="vertical" className="bg-gray-600 " />
                            <Button variant="text" >
                                <ThumbDownOffAlt />
                            </Button>
                        </div>
                        <Button variant="text">
                            <TurnedInNot /> <span className=" ml-1 lowercase">Save</span>
                        </Button>
                        <Button variant="text">
                            <GetApp /> <span className=" ml-1 lowercase">Download</span>
                        </Button>
                    </div>

                </div>
            )}
            <div className="mt-2 text-md text-gray-100 font-medium">
                <p>
                    <span className="">{viewConverter(video?.statistics?.viewCount)} views</span>
                    <span className=" ml-1"> {video?.snippet?.publishedAt}</span>
                    {video?.snippet?.tags?.slice(0, 6).map((tag: any, idx: number) => (
                        <button onClick={() => { setQuery(tag), submitQuery() }} key={idx} className="ml-2 text-blue-400 cursor-pointer">#{tag}</button>
                    ))}
                </p>
                <DescriptionToggle description={video?.snippet?.description} />
                <CommentSection video={video} />
            </div >
        </div >

    )
}

export default DetailCard