import { useEffect, useState } from "react";
import type { ContentDetails } from "../service/type";
import { getVideoComments } from "../service";
import Avatar from "@mui/material/Avatar";

interface CommentSectionProps {
  video: ContentDetails;
}

const avatarColors = [
  "#f44336", // red
  "#e91e63", // pink
  "#9c27b0", // purple
  "#673ab7", // deep purple
  "#3f51b5", // indigo
  "#2196f3", // blue
  "#03a9f4", // light blue
  "#00bcd4", // cyan
  "#009688", // teal
  "#4caf50", // green
  "#8bc34a", // light green
  "#cddc39", // lime
  "#ff9800", // orange
  "#ff5722", // deep orange
];

function getRandomColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarColors.length;
  return avatarColors[index];
}

export const CommentSection = ({ video }: CommentSectionProps) => {
  const [filter, setFilter] = useState<"Top" | "Newest">("Top");
  const [comments, setComments] = useState<any[]>([]);

  const fetchComments = async () => {
    if (!video?.id) return;

    const order = filter === "Top" ? "relevance" : "time";

    try {
      const data = await getVideoComments(video.id, order);
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [video?.id, filter]);

  const isActiveButton = (value: "Top" | "Newest") =>
    filter === value
      ? "bg-white text-gray-950 font-semibold"
      : " hover:bg-gray-700";

  return (
    <section className="mt-5">
      <div className="flex justify-between flex-wrap gap-4 items-center mb-4">
        <h1 className="text-lg font-semibold">
          {video?.statistics?.commentCount || 0} comments
        </h1>
        <div className="flex md:w-fit w-full justify-between rounded overflow-hidden">
          <button
            onClick={() => setFilter("Top")}
            className={`px-4 md:w-fit w-full py-2 text-sm transition ${isActiveButton("Top")}`}
          >
            Top Comments
          </button>
          <button
            onClick={() => setFilter("Newest")}
            className={`px-4 md:w-fit w-full py-2 text-sm transition ${isActiveButton("Newest")}`}
          >
            Newest First
          </button>
        </div>
      </div>

      <div>
        {comments.map((comment) => {
          const snippet = comment?.snippet?.topLevelComment?.snippet;
          if (!snippet) return null;

          const authorName = snippet.authorDisplayName || "";
          const commentText = snippet.textDisplay || "";

          const firstLetter = authorName.startsWith("@")
            ? authorName[1]?.toUpperCase() || "U"
            : authorName[0]?.toUpperCase() || "U";

          const avatarBg = getRandomColor(authorName);

          return (
            <div key={comment.id} className="flex gap-4 mb-4 items-start">
              <Avatar
                sx={{ width: 40, height: 40, mt: "4px", bgcolor: avatarBg , cursor: "pointer" }}
              >
                {firstLetter}
              </Avatar>
              <div>
                <a className="font-semibold hover:underline transition-all text-lg cursor-pointer">
                  {authorName}
                </a>
                <p
                  className="text-sm text-gray-50/70"
                  dangerouslySetInnerHTML={{ __html: commentText }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
