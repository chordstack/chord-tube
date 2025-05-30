import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, type QueryFunctionContext } from "@tanstack/react-query";

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
import { Loading } from "../components/loading";
import Pagination from "@mui/material/Pagination";

import { categoryMap, regions } from "../constants/categoryMap";
import noData from "../assets/images/nodata.webp";

const ITEMS_PER_PAGE = 10;

const Home = () => {
  const [cols, setCols] = useState(3);
  const [page, setPage] = useState(1);

  const categoryId = useCategoryIdStore((state) => state.categoryId);
  const regionCode = useRegionCodeStore((state) => state.regionCode);
  const query = useSearchStore((state) => state.query) ?? "";

  const navigate = useNavigate();

  const isSearchMode = query.trim().length > 0;
  const categoryName = categoryMap[categoryId] ?? "home";

  useEffect(() => {
    if (!categoryMap.hasOwnProperty(categoryId)) {
      console.warn(
        `categoryId "${categoryId}" not found in categoryMap. Using 'home' as fallback.`
      );
    }
  }, [categoryId]);

  useEffect(() => {
    if (!isSearchMode && categoryName) {
      navigate(`/${categoryName}`);
    }
  }, [isSearchMode, categoryName, navigate]);

  const fetchVideos = useCallback(
    async ({ pageParam = "" }: { pageParam?: string }) => {
      if (isSearchMode) return getSearchVideos(query, pageParam);
      return getTrendingVideos(categoryId, regionCode, pageParam);
    },
    [isSearchMode, query, categoryId, regionCode]
  );

 const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
} = useInfiniteQuery<VideoListResponse, Error>({
  queryKey: ["videos", query, categoryId, regionCode],
  queryFn: ({ pageParam }: QueryFunctionContext) => fetchVideos({ pageParam: String(pageParam) }),
  initialPageParam: "",
  getNextPageParam: (lastPage) =>
    isSearchMode && lastPage?.nextPageToken ? lastPage.nextPageToken : false,
  staleTime: 1000 * 60 * 2,
});

  const handleScroll = useCallback(() => {
    if (!isSearchMode) return;

    const scrollBottom =
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 200;

    if (scrollBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isSearchMode]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const allVideos = useMemo(
    () => data?.pages.flatMap((page) => page.items ?? []) || [],
    [data]
  );

  const paginatedVideos = useMemo(() => {
    if (isSearchMode) return allVideos;

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return allVideos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [allVideos, page, isSearchMode]);

  const getGridColsClass = () => {
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
        return "grid-cols-3";
    }
  };

  const currentRegion = regions.find((r) => r.code === regionCode);
  const regionNameMap: Record<string, string> = {
    US: "United States",
    GB: "United Kingdom",
    SG: "Singapore",
    JP: "Japan",
    TH: "Thailand",
    KR: "South Korea",
  };
  const regionName = regionNameMap[regionCode];

  return (
    <>
      <div className="flex gap-5 md:mt-24 mt-20 justify-between md:items-center items-start">
        <RegionButtonGroup />
        <ColumnSwitcher onChange={setCols} />
      </div>

      {!isSearchMode && currentRegion && (
        <div className="lg:text-4xl md:text-3xl text-xl md:mt-6 mt-4 font-semibold md:mb-4 flex w-full justify-center items-center gap-2">
          <span>Trending Videos at</span>
          <span className="md:block hidden">{regionName}</span>
          <span className="md:hidden block">{currentRegion.label}</span>
          <img
            src={currentRegion.flag}
            alt={currentRegion.label}
            className="md:w-14 w-10 ml-1 object-cover rounded-sm mt-1"
          />
        </div>
      )}

      {isLoading ? (
        <Loading />
      ) : paginatedVideos.length > 0 ? (
        <>
          <div
            className={`grid ${getGridColsClass()} md:gap-x-4 md:gap-y-6 gap-x-3 gap-y-5 mt-5 w-full`}
          >
            {paginatedVideos.map((video: VideoListItem, idx: number) => (
              <Card
                key={idx}
                idx={idx}
                video={video}
                badgeNumber={
                  !isSearchMode && (page - 1) * ITEMS_PER_PAGE + idx < 10
                    ? (page - 1) * ITEMS_PER_PAGE + idx + 1
                    : undefined
                }
                isSearchMode={isSearchMode}
              />
            ))}
          </div>

          {!isSearchMode && (
            <div className="flex justify-center mt-8">
              <Pagination
                count={Math.ceil(allVideos.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={(_, value) => setPage(value)}
                shape="circular"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      color: "black",
                    },

                  },
                }}
              />
            </div>
          )}

          {isFetchingNextPage && isSearchMode && (
            <div className="flex justify-center mt-4">
              <Loading />
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
