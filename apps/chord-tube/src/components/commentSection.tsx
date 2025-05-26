import { useEffect, useState } from "react";
import type { ContentDetails } from "../service/type";
import { getVideoComments } from "../service";
import Avatar from "@mui/material/Avatar";

export const CommentSection = ({ video }: { video: ContentDetails }) => {
    const [filter, setFilter] = useState<"Top" | "Newest">("Top");
    const [comments, setComments] = useState<any[]>([]);

    const fetchComments = async () => {
        if (!video?.id) return;
        const order = filter === "Top" ? "relevance" : "time";
        try {
            const data = await getVideoComments(video.id, order);
            setComments(data);
        } catch (err) {
            console.error("Failed to fetch comments", err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [video?.id, filter]);

    const isActive = (val: "Top" | "Newest") =>
        filter === val
            ? "bg-[rgba(255,255,255,0.3)] font-semibold"
            : "bg-[rgba(255,255,255,0.1)] hover:bg-gray-700";

    return (
        <section className="mt-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">
                    {video?.statistics?.commentCount || 0} comments
                </h1>
                <div className="flex rounded overflow-hidden">
                    <button
                        onClick={() => setFilter("Top")}
                        className={`px-4 py-1 text-sm transition ${isActive("Top")}`}
                    >
                        Top Comments
                    </button>
                    <button
                        onClick={() => setFilter("Newest")}
                        className={`px-4 py-1 text-sm transition ${isActive("Newest")}`}
                    >
                        Newest First
                    </button>
                </div>
            </div>

            <div>
                {comments.map((comment) => {
                    const snippet = comment?.snippet?.topLevelComment?.snippet;

                    if (!snippet) return null; // Defensive check

                    const imgUrl = snippet.authorProfileImageUrl;
                    const authorName = snippet.authorDisplayName;
                    const commentText = snippet.textDisplay;

                    const hasValidImage =
                        typeof imgUrl === "string" && imgUrl.startsWith("http");

                    return (
                        <div key={comment.id} className="flex gap-4 mb-4 items-start">
                            {hasValidImage ? (
                                <img
                                    src={imgUrl}
                                    alt={authorName}
                                    className="w-10 h-10 mt-1 rounded-full"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = ""; // fallback to empty or default image
                                    }}
                                />
                            ) : (
                                <Avatar sx={{ width: 40, height: 40, mt: "4px" }}>
                                    {authorName?.[0]?.toUpperCase() || "U"}
                                </Avatar>
                            )}
                            <div>
                                <a className="font-semibold hover:underline transition-all text-lg cursor-pointer">{authorName}</a>
                                <p className="text-sm text-gray-50/70" dangerouslySetInnerHTML={{ __html: commentText }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
