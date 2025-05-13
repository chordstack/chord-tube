export default {
  listUrl: "https://youtube.googleapis.com/youtube/v3/videos",
  searchUrl: "https://youtube.googleapis.com/youtube/v3/search",
  channelUrl: "https://youtube.googleapis.com/youtube/v3/channels",
  BASE_URL: "https://www.googleapis.com/youtube/v3",
  key: import.meta.env.VITE_KEY,
} as const;
