import { useEffect, useState } from "react";
import type { ContentDetails } from "../service/type";
import { getVideoComments } from "../service";


export const CommentSection = ({ video }: ContentDetails) => {
    const [filter, setFilter] = useState("Top");
    const [comments, setComments] = useState([]);

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

    const isActive = (val: string) =>
        filter === val
            ? "bg-[rgba(255,255,255,0.3)]  font-semibold"
            : "bg-[rgba(255,255,255,0.1)]  hover:bg-gray-700";

    return (
        <section className="mt-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">
                    {video?.statistics.commentCount} comments
                </h1>
                <div className="flex rounded overflow-hidden ">
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
                <div>
                    {comments.map((comment: any) => (
                        <div key={comment.id} className="flex gap-4 mb-4 items-start">
                            <img
                                src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                                alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
                                className="w-10 h-10 mt-1 rounded-full"
                            />
                            <div>
                                <h2 className="font-semibold text">
                                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                                </h2>
                                <p className="text-sm">{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};
