import { useEffect, useState } from "react";
import { getSearchVideos, getTrendingVideos, viewConverter } from "../service";
import type { VideoListItem } from "../service/type";
import { useCategoryIdStore, useRegionCodeStore, useSearchStore } from "../stores/useVideoStore";

import { SuggestedCard } from "./suggestedCard";

export default function SuggestedVdSection({ cateId, id }: { cateId: number, id: string | undefined }) {
    const setCategoryId = useCategoryIdStore((state) => state.setCategoryId);
    const categoryId = useCategoryIdStore((state) => state.categoryId);
    const regionCode = useRegionCodeStore((state) => state.regionCode);
    const [videos, setVideos] = useState<VideoListItem[]>([]);
    const q = useSearchStore((state) => state.query);
    // useEffect(() => {
    //     {
    //         setCategoryId(cateId);
    //         getTrendingVideos(categoryId, regionCode)
    //             .then(data => setVideos(data.items));
    //     }
    // }, [id, cateId]);
    useEffect(() => {
        if (q.length === 0) {
            getTrendingVideos(categoryId, regionCode)
                .then(data => setVideos(data.items));
        } else {
            getSearchVideos(q)
                .then(data => setVideos(data.items));
        }
    }, [q, categoryId, regionCode]);
    console.log(categoryId)


    return (
        <div className=" py-5 w-full flex flex-col gap-4">
            {
                videos?.map((video, idx) => (
                    id === video.id ? null : <SuggestedCard key={idx} video={video} />
                ))
            }
        </div>
    )
}
