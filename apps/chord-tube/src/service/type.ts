export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Snippet = {
  publishedAt: string | Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  channelTitle: string;
  tags: string[];
  categoryId: number;
  localized: { title: string; description: string };
  defaultAudioLanguage: string;
};

export type ContentDetails = any;

export type Statistics = any;

export type VideoListItem = {
  kind: string;
  etag: string;
  id: string | { videoId: string };
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
  items?: VideoListItem[];
};

export type VideoListResponse = {
  kind: string;
  etag: string;
  items: VideoListItem[];
  pageInfo?: any;
  pages?: VideoListItem[];
  nextPageToken?: string | null;

};

export type SidebarItem = {
  label: string;
  icon: React.ReactNode;
};

export type CategoryIdStore = {
  categoryId: number;
  setCategoryId: (id: number) => void;
};

export type RegionCodeStore = {
  regionCode: string;
  setRegionCode: (code: string) => void;
};
export type SearchState = {
  input: string;
  query: string;
  setInput: (value: string) => void;
  submitQuery: () => void;
};

export type flagPage = {
  flag: boolean;
  setFlag: (flag: boolean) => void;
};

export type CardProps = {
  video: VideoListItem;
  idx: number;
};
