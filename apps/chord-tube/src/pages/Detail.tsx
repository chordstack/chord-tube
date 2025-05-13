import { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getVideoDetail, getChannelDetail } from "../service";
import DetailCard from "../components/detailCard";
import type { ContentDetails } from "../service/type";
import SuggestedVdSection from "../components/suggestedVdSection";
import { useCategoryIdStore } from "../stores/useVideoStore";

const Detail = () => {
    const { id } = useParams();
    const [video, setVideo] = useState<ContentDetails>(null);
    const [channel, setChannel] = useState<ContentDetails>(null);

    useEffect(() => {
        if (!id) return;
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
            <SuggestedVdSection cateId={video?.snippet.categoryId} id={id} />
        </div>
    );
};

export default Detail;
