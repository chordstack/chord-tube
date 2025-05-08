export type Thumbnail = {
  url: string;
  width: number;
  height: number;
}

export type Snippet = {
  publishedAt: string | Date
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    "default": Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  channelTitle: string;
  tags: string[];
  categoryId: number;
  localized: { title: string, description: string };
  defaultAudioLanguage: string;
}

export type ContentDetails = any;

export type Statistics = any;

export type VideoListItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
}

export type VideoListResponse = {
  kind: string;
  etag: string;
  items: VideoListItem[]
}
