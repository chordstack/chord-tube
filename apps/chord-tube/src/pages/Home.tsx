import { useEffect, useState, useCallback } from "react";
import { getSearchVideos, getTrendingVideos } from "../service";
import type { VideoListItem, VideoListResponse } from "../service/type";
import {
    useCategoryIdStore,
    useRegionCodeStore,
    useSearchStore,
} from "../stores/useVideoStore";
import ColumnSwitcher from "../components/colsSwitcher";
import RegionButtonGroup from "../components/RegionButtonGroup";
import Card from "../components/card";
import noData from "../assets/images/nodata.webp";
import { useNavigate } from "react-router-dom";
import { categoryMap } from "../constants/categoryMap";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loading } from "../components/loading";

const Home = () => {
    const [cols, setCols] = useState(3);
    const categoryId = useCategoryIdStore((state) => state.categoryId);
    const regionCode = useRegionCodeStore((state) => state.regionCode);
    const q = useSearchStore((state) => state.query);
    const navigate = useNavigate();

    // Safe fallback for name if categoryId is invalid
    const name = categoryMap[categoryId] ?? "home";

    // Debug log if categoryId not found in categoryMap
    useEffect(() => {
        if (!categoryMap.hasOwnProperty(categoryId)) {
            console.warn(
                `categoryId ${categoryId} not found in categoryMap, falling back to 'home'`
            );
        }
    }, [categoryId]);

    useEffect(() => {
        if (q.length === 0 && typeof name === "string" && name.trim() !== "") {
            navigate(`/${name}`);
        }
    }, [q, name, navigate]);

    const fetchVideos = async ({ pageParam = "" as string }) => {
        if (q.length === 0) {
            return getTrendingVideos(categoryId, regionCode, pageParam);
        } else {
            return getSearchVideos(q, pageParam);
        }
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery<VideoListResponse, Error>({
        queryKey: ["videos", q, categoryId, regionCode],
        queryFn: () => fetchVideos({ pageParam: "" }),
        initialPageParam: "",
        getNextPageParam: (lastPage) => lastPage.nextPageToken ?? false,
        staleTime: 1000 * 60 * 2,
    });

    // Custom scroll listener
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const visibleHeight = window.innerHeight;
        const fullHeight = document.body.scrollHeight;

        if (
            scrollY + visibleHeight >= fullHeight - 200 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

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

    const videos = data?.pages?.flatMap((page) => page.items ?? []) || [];

    return (
        <>
            <div className="flex gap-5 justify-between md:items-center items-start">
                <RegionButtonGroup />
                <ColumnSwitcher onChange={(cols) => setCols(cols)} />
            </div>

            {isLoading ? (
                <Loading />
            ) : videos.length > 0 ? (
                <>
                    <div
                        className={`grid ${getGridCols()} md:gap-x-4 md:gap-y-6 gap-x-3 gap-y-5 mt-5 w-full`}
                    >
                        {videos.map((video: VideoListItem, idx: number) => (
                            <Card key={idx} idx={idx} video={video} />
                        ))}
                    </div>

                    {isFetchingNextPage && (
                        <div className="text-center mt-5 text-sm text-gray-400">
                            Loading more...
                        </div>
                    )}
                </>
            ) : (
                <figure className="w-full mt-10 flex justify-center caret-transparent items-center">
                    <img src={noData} className="max-w-[50%]" alt="No results" />
                </figure>
            )}
        </>
    );
};

export default Home;
