import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchVideos, getTrendingVideos } from "../service";
import { useCategoryIdStore, useRegionCodeStore, useSearchStore } from "../stores/useVideoStore";
import { SuggestedCard } from "./suggestedCard";

export default function SuggestedVdSection({ id }: { id: string | undefined }) {
    const categoryId = useCategoryIdStore((state) => state.categoryId);
    const regionCode = useRegionCodeStore((state) => state.regionCode);
    const q = useSearchStore((state) => state.query);
    const loader = useRef<HTMLDivElement | null>(null);

    const fetchVideos = async ({ pageParam = "" }) => {
        const data = q.length === 0
            ? await getTrendingVideos(categoryId, regionCode, pageParam)
            : await getSearchVideos(q, pageParam);
        return data;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["suggestedVideos", q, categoryId, regionCode],
        queryFn: fetchVideos,
        getNextPageParam: (lastPage) => lastPage?.nextPageToken ?? false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, { threshold: 1.0 });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage]);

    return (
        <div className="py-5 w-full flex flex-col gap-4 relative">
            {data?.pages.map((page, pageIndex) =>
                page.items.map((video: any, idx: number) =>
                    video.id === id ? null : (
                        <SuggestedCard key={`${pageIndex}-${idx}`} video={video} />
                    )
                )
            )}
            <div ref={loader} className="h-10" />
            {isFetchingNextPage && <p className="text-center text-sm text-gray-400">Loading more...</p>}
        </div>
    );
}
