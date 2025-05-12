import { use, useEffect, useState } from "react";
import { getSearchVideos, getTrendingVideos } from "../service";
import type { VideoListResponse } from "../service/type";
import { useCategoryIdStore, useRegionCodeStore, useSearchStore } from "../stores/useVideoStore";
import ColumnSwitcher from "../components/colsSwitcher";
import RegionButtonGroup from "../components/RegionButtonGroup";
import Card from "../components/card";
import noData from "../assets/images/nodata.webp"

const Home = () => {
    const [videos, setVideos] = useState<VideoListResponse["items"]>([]);
    const [cols, setCols] = useState(3);
    const categoryId = useCategoryIdStore((state) => state.categoryId);
    const regionCode = useRegionCodeStore((state) => state.regionCode);
    const q = useSearchStore((state) => state.query);


    useEffect(() => {
        if (q.length === 0) {
            getTrendingVideos(categoryId, regionCode)
                .then(data => setVideos(data.items));
        } else {
            getSearchVideos(q)
                .then(data => setVideos(data.items));
        }
    }, [q, categoryId, regionCode]);
    console.log(q);
    console.log(videos);

    const getGridCols = () => {
        switch (cols) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-2";
            case 3:
                return "grid-cols-3";
            case 4:
                return "grid-cols-4";
            case 5:
                return "grid-cols-5";
            default:
                return "grid-cols-5";
        }
    };




    return (
        <>
            <div className="flex gap-5 justify-between md:items-center items-start">
                <RegionButtonGroup />
                <ColumnSwitcher onChange={(cols) => setCols(cols)} />
            </div>
            {videos.length > 0 ? (
                <div className={`grid ${getGridCols()} md:gap-x-4 md:gap-y-6 gap-x-3 gap-y-5 mt-5 w-full`}>
                    {videos.map((video, idx) => (
                        <Card key={idx} idx={idx} video={video} />
                    ))}
                </div>
            ) : (
                <figure className="w-full flex justify-center  items-center">
                    <img src={noData} className=" max-w-[40%] " alt="No results" />
                </figure>
            )}
        </>
    );
};

export default Home;
