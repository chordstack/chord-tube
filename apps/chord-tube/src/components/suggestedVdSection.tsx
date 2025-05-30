import { useRef, useEffect } from "react";
import { useInfiniteQuery, type QueryFunction } from "@tanstack/react-query";
import { getSearchVideos, getTrendingVideos } from "../service";
import { useCategoryIdStore, useRegionCodeStore, useSearchStore } from "../stores/useVideoStore";
import { SuggestedCard } from "./suggestedCard";
import type { VideoListResponse, VideoListItem } from "../service/type";

export default function SuggestedVdSection({ id }: { id: string | undefined }) {
    const categoryId = useCategoryIdStore((state) => state.categoryId);
    const regionCode = useRegionCodeStore((state) => state.regionCode);
    const q = useSearchStore((state) => state.query);
    const loader = useRef<HTMLDivElement | null>(null);

    const fetchVideos: QueryFunction<VideoListResponse, ["suggestedVideos", string, number, string], string> = async ({ pageParam = "" }) => {
        return q.length === 0
            ? await getTrendingVideos(categoryId, regionCode, pageParam)
            : await getSearchVideos(q, pageParam);
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<VideoListResponse, Error, VideoListResponse, ["suggestedVideos", string, number, string], string>({
        queryKey: ["suggestedVideos", q, categoryId, regionCode],
        queryFn: fetchVideos,
        getNextPageParam: (lastPage) => lastPage?.nextPageToken ?? undefined,
        initialPageParam: "0",
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, { threshold: 1.0 });

        const currentLoader = loader.current;
        if (currentLoader) observer.observe(currentLoader);

        return () => {
            if (currentLoader) observer.unobserve(currentLoader);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="lg:mt-0 mt-5 w-full lg:col-span-1 col-span-1 flex flex-col gap-4 relative">
            {data?.pages?.map((page, pageIndex) =>
                page.items?.map((video: VideoListItem, idx: number) => {
                    const videoId = typeof video.id === "string" ? video.id : video.id?.videoId;
                    return videoId === id ? null : (
                        <SuggestedCard key={`${pageIndex}-${idx}`} video={video} />
                    );
                })
            )}
            <div ref={loader} className="h-10" />
            {isFetchingNextPage && <p className="text-center text-sm text-gray-400">Loading more...</p>}
        </div>
    );
}
