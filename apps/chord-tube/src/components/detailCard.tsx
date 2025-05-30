import { useEffect, useState } from "react";
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
import { viewConverter } from "../constants/categoryMap";
import moment from "moment";

const DetailCard = ({ video, channel, id }: any) => {
  const setQuery = useSearchStore((state) => state.setInput);
  const submitQuery = useSearchStore((state) => state.submitQuery);
  const formattedDate = moment(video?.snippet?.publishedAt).fromNow();

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowComments(false); // Reset comments visibility on video change
  }, [id]);

  const thumbnail = video?.snippet?.thumbnails?.high?.url;

  return (
    <div className=" lg:col-span-2 col-span-1 w-full relative">
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

      <h1 className="md:text-xl text-lg font-semibold mt-3 line-clamp-3 relative">{video?.snippet?.title}</h1>

      {channel && (
        <div className="flex items-center gap-4 flex-wrap justify-between mt-2 mb-2 relative">
          <div className="flex justify-between gap-4 md:w-fit w-full items-center">
            <div>
              <div className="flex md:justify-start w-full justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{channel?.snippet?.title}</h2>
                  <p className="text-sm text-gray-400">
                    {channel?.statistics?.subscriberCount
                      ? `${viewConverter(channel.statistics.subscriberCount)} subscribers`
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <SubscribeButton />
          </div>

          <div className="flex gap-2">
            <div className="flex items-center rounded-full">
              <Button variant="text">
                <ThumbUpAlt />
                <span className="ml-1">
                  {video?.statistics?.likeCount
                    ? viewConverter(video.statistics.likeCount)
                    : null}
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
          <span>
            {video?.statistics?.viewCount
              ? viewConverter(video.statistics.viewCount)
              : null}{" "}
            views
          </span>
          <span className="ml-2">{formattedDate}</span>

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

        <div className="block lg:hidden mt-4">
          <Button
            variant="text"
            className="w-full !border-b-2 border-gray-50"
            onClick={() => setShowComments((prev) => !prev)}
          >
            {showComments ? "Hide Comments" : "Show Comments"}
          </Button>
        </div>

        <div className={`${showComments ? "block" : "hidden"} lg:block mt-4`}>
          <CommentSection video={video} />
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
