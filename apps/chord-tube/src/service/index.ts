import axios from "axios";
import config from "../config";
import type { VideoListResponse } from "./type";

type VideoListRequestParams = {
  chart: "mostPopular";
  part: ("snippet" | "contentDetails" | "statistics")[];
  maxResults: number;
  regionCode: string;
  videoCategoryId: number | string;
  key: string | null;
};

class PathParamsBuilder {
  private _params: VideoListRequestParams = {
    chart: "mostPopular",
    part: ["snippet", "contentDetails", "statistics"],
    maxResults: 20,
    regionCode: "GB",
    videoCategoryId: 0,
    key: null,
  };

  part(part: VideoListRequestParams["part"]) {
    this._params.part = part;
    return this;
  }

  chart(value: VideoListRequestParams["chart"]) {
    this._params.chart = value;
    return this;
  }

  maxResults(value: VideoListRequestParams["maxResults"]) {
    this._params.maxResults = value;
    return this;
  }

  regionCode(value: VideoListRequestParams["regionCode"]) {
    this._params.regionCode = value;
    return this;
  }

  videoCategoryId(value: VideoListRequestParams["videoCategoryId"]) {
    this._params.videoCategoryId = value;
    return this;
  }

  key(value: string) {
    this._params.key = value;
    return this;
  }

  build(baseUrl: string) {
    const url = new URL(baseUrl);

    Object.keys(this._params).forEach((k) => {
      const _value = this._params[k as keyof typeof this._params];

      const value = Array.isArray(_value)
        ? _value.join(",")
        : _value?.toString();

      if (value) url.searchParams.set(k, value);
    });

    return url.toString();
  }
}

export const pathParamsBuilder = new PathParamsBuilder();

export async function getTrendingVideos(): Promise<VideoListResponse> {
  const query = pathParamsBuilder
    // .videoCategoryId("10")
    .key(config.key)
    .build(config.listUrl);

  const { data } = await axios.get(query);
  return data;
}
