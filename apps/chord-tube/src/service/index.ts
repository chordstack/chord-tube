import axios from "axios";
import config from "../config";
import type { VideoListResponse } from "./type";

/**
 * Trending Videos Request Builder
 */
type TrendingVideoParams = {
  chart: "mostPopular";
  part: ("snippet" | "contentDetails" | "statistics")[];
  maxResults: number;
  regionCode: string;
  videoCategoryId: number | string;
  key: string | null;
};

class TrendingParamsBuilder {
  private _params: TrendingVideoParams = {
    chart: "mostPopular",
    part: ["snippet", "contentDetails", "statistics"],
    maxResults: 100,
    regionCode: "GB",
    videoCategoryId: 0,
    key: null,
  };

  chart(value: TrendingVideoParams["chart"]) {
    this._params.chart = value;
    return this;
  }

  part(value: TrendingVideoParams["part"]) {
    this._params.part = value;
    return this;
  }

  maxResults(value: number) {
    this._params.maxResults = value;
    return this;
  }

  regionCode(value: string) {
    this._params.regionCode = value;
    return this;
  }

  videoCategoryId(value: number | string) {
    this._params.videoCategoryId = value;
    return this;
  }

  key(value: string) {
    this._params.key = value;
    return this;
  }

  build(baseUrl: string) {
    const url = new URL(baseUrl);
    Object.entries(this._params).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        url.searchParams.set(k, v.join(","));
      } else if (v !== null && v !== undefined && v !== "") {
        url.searchParams.set(k, String(v));
      }
    });
    return url.toString();
  }
}

/**
 * Search Videos Request Builder
 */
type SearchVideoParams = {
  part: string;
  maxResults: number;
  q: string;
  key: string | null;
};

class SearchParamsBuilder {
  private _params: SearchVideoParams = {
    part: "snippet",
    maxResults: 100,
    q: "",
    key: null,
  };

  part(value: "snippet") {
    this._params.part = value;
    return this;
  }

  maxResults(value: number) {
    this._params.maxResults = value;
    return this;
  }

  q(value: string) {
    this._params.q = value;
    return this;
  }

  key(value: string) {
    this._params.key = value;
    return this;
  }

  build(baseUrl: string) {
    const url = new URL(baseUrl);
    Object.entries(this._params).forEach(([k, v]) => {
      if (v !== null && v !== undefined && v !== "") {
        url.searchParams.set(k, String(v));
      }
    });
    return url.toString();
  }
}

/**
 * Video Detail Request Builder
 */
type VideoDetailParams = {
  part: ("snippet" | "contentDetails" | "statistics")[];
  id: string;
  key: string | null;
};

class VideoDetailParamsBuilder {
  private _params: VideoDetailParams = {
    part: ["snippet", "contentDetails", "statistics"],
    id: "",
    key: null,
  };

  part(value: VideoDetailParams["part"]) {
    this._params.part = value;
    return this;
  }

  id(value: string) {
    this._params.id = value;
    return this;
  }

  key(value: string) {
    this._params.key = value;
    return this;
  }

  build(baseUrl: string) {
    const url = new URL(baseUrl);
    Object.entries(this._params).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        url.searchParams.set(k, v.join(","));
      } else if (v !== null && v !== undefined && v !== "") {
        url.searchParams.set(k, String(v));
      }
    });
    return url.toString();
  }
}

// 🟢 Export functions
export async function getTrendingVideos(
  categoryId: number,
  regionCode: string
): Promise<VideoListResponse> {
  const url = new TrendingParamsBuilder()
    .videoCategoryId(categoryId)
    .regionCode(regionCode)
    .key(config.key)
    .build(config.listUrl);

  const { data } = await axios.get(url);
  return data;
}

export async function getSearchVideos(q: string): Promise<VideoListResponse> {
  const url = new SearchParamsBuilder()
    .q(q)
    .key(config.key)
    .build(config.searchUrl);

  const { data } = await axios.get(url);
  return data;
}

export async function getVideoDetail(id: string): Promise<VideoListResponse> {
  const url = new VideoDetailParamsBuilder()
    .id(id)
    .key(config.key)
    .build(config.listUrl);

  const { data } = await axios.get(url);
  return data;
}

export async function getChannelDetail(id: string): Promise<any> {
  const url = new URL(config.channelUrl);
  url.searchParams.set("part", "snippet,statistics");
  url.searchParams.set("id", id);
  url.searchParams.set("key", config.key || "");

  const { data } = await axios.get(url.toString());
  return data;
}

export const viewConverter = (value: number) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  } else {
    return value;
  }
};

export const getVideoComments = async (videoId: string, order: string) => {
  const { data } = await axios.get(`${config.BASE_URL}/commentThreads`, {
    params: {
      part: "snippet",
      videoId,
      maxResults: 100,
      order: order,
      key: config.key,
    },
  });
  return data.items;
};
