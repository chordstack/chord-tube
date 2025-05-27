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
import { categoryMap, regions } from "../constants/categoryMap";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loading } from "../components/loading";

const Home = () => {
    const [cols, setCols] = useState(3);
    const categoryId = useCategoryIdStore((state) => state.categoryId);
    const regionCode = useRegionCodeStore((state) => state.regionCode);
    const query = useSearchStore((state) => state.query) ?? ""; // fallback to empty string
    const navigate = useNavigate();

    const categoryName = categoryMap[categoryId] ?? "home";
    const isSearchMode = query.trim().length > 0;


    // Warn if categoryId not in map
    useEffect(() => {
        if (!categoryMap.hasOwnProperty(categoryId)) {
            console.warn(`categoryId ${categoryId} not found. Using 'home' as fallback.`);
        }
    }, [categoryId]);

    // Redirect if no search query (not in search mode)
    useEffect(() => {
        if (!isSearchMode && categoryName) {
            navigate(`/${categoryName}`);
        }
    }, [isSearchMode, categoryName, navigate]);

    // Fetch videos based on mode
    const fetchVideos = async ({ pageParam = "" }: { pageParam?: string }) => {
        return isSearchMode
            ? getSearchVideos(query, pageParam)
            : getTrendingVideos(categoryId, regionCode, pageParam);
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery<VideoListResponse, Error>({
        queryKey: ["videos", query, categoryId, regionCode],
        queryFn: ({ pageParam }) => fetchVideos({ pageParam }),
        initialPageParam: "",
        getNextPageParam: (lastPage) =>
            isSearchMode && lastPage?.nextPageToken ? lastPage.nextPageToken : false,
        staleTime: 1000 * 60 * 2,
    });

    // Infinite scroll handler only in search mode
    const handleScroll = useCallback(() => {
        if (!isSearchMode) return;

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
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, isSearchMode]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Helper to convert number of cols to Tailwind grid class
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

    const videos = data?.pages.flatMap((page) => page.items ?? []) || [];

    const currentRegion = regions.find((r) => r.code === regionCode);

    const regionNameMap: Record<string, string> = {
        US: "United States",
        GB: "United Kingdom",
        SG: "Singapore",
        JP: "Japan",
        TH: "Thailand",
        KR: "South Korea",
    };

    const regionName = regionNameMap[regionCode]

    return (
        <>
            <div className="flex gap-5 md:mt-4 justify-between md:items-center items-start">
                <RegionButtonGroup />
                <ColumnSwitcher onChange={(cols) => setCols(cols)} />
            </div>

            {!isSearchMode && currentRegion && (
                <div className="lg:text-4xl md:text-3xl text-2xl mt-4 font-semibold md:mb-8 mb-6 flex w-full justify-center items-center gap-2">
                    <span>Trending Videos at</span>
                    <span className=" md:block hidden">{regionName}</span>
                    <span className=" md:hidden block">{currentRegion.label}</span>
                    <img
                        src={currentRegion.flag}
                        alt={currentRegion.label}
                        className="md:w-14 w-10 ml-1 object-cover rounded-sm mt-1"
                    />
                </div>
            )}

            {isLoading ? (
                <Loading />
            ) : videos.length > 0 ? (
                <>
                    <div
                        className={`grid ${getGridCols()} md:gap-x-4 md:gap-y-6 gap-x-3 gap-y-5 mt-5 w-full`}
                    >
                        {videos.map((video: VideoListItem, idx: number) => (
                            <Card
                                key={idx}
                                idx={idx}
                                video={video}
                                badgeNumber={!isSearchMode && idx < 10 ? idx + 1 : undefined}
                                isSearchMode={isSearchMode}
                            />
                        ))}
                    </div>

                    {isFetchingNextPage && (
                        <div className="text-center mt-5 text-sm text-gray-400">
                            Loading more...
                        </div>
                    )}
                </>
            ) : (
                <figure className="w-full mt-10 flex justify-center items-center caret-transparent">
                    <img src={noData} className="max-w-[50%]" alt="No results" />
                </figure>
            )}
        </>
    );
};

export default Home;
