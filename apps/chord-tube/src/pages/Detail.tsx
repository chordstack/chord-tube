import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideoDetail, getChannelDetail } from "../service";
import DetailCard from "../components/detailCard";
import type { ContentDetails } from "../service/type";
import SuggestedVdSection from "../components/suggestedVdSection";

const Detail = () => {
    const { id }: string | any = useParams();
    const [video, setVideo] = useState<ContentDetails>(null);
    const [channel, setChannel] = useState<ContentDetails>(null);

    useEffect(() => {
        if (!id) return;
        // Scroll to top when video ID changes
        window.scrollTo({ top: 0, behavior: "smooth" });

        fetchDetail();
    }, [id]);

    const fetchDetail = async () => {
        try {
            const data = await getVideoDetail(id);
            const videoItem = data.items[0];
            setVideo(videoItem);

            const channelId = videoItem.snippet.channelId;
            const channelData = await getChannelDetail(channelId);
            setChannel(channelData.items[0]);
        } catch (err) {
            console.error("Failed to fetch detail", err);
        }
    };

    return (
        <div className="md:grid-cols-4 grid-cols-1 grid gap-4 mt-5">
            <DetailCard video={video} channel={channel} id={id} />
            <SuggestedVdSection id={id} />
        </div>
    );
};

export default Detail;
