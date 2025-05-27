export const categoryMap: Record<number, string> = {
  0: "home",
  2: "cars & vehicles",
  23: "comedy",
  27: "education",
  24: "entertainment",
  1: "film & animation",
  20: "gaming",
  26: "how-to & style",
  10: "music",
  25: "news & politics",
  29: "non-profits & activism",
  22: "people & blogs",
  15: "pets & animals",
  28: "science & technology",
  17: "sports",
  19: "travel & events",
};

export const regions = [
  { code: "GB", label: "UK", flag: "https://flagcdn.com/gb.svg" },
  { code: "US", label: "US", flag: "https://flagcdn.com/us.svg" },
  { code: "JP", label: "JP", flag: "https://flagcdn.com/jp.svg" },
  { code: "KR", label: "KR", flag: "https://flagcdn.com/kr.svg" },
  { code: "SG", label: "SG", flag: "https://flagcdn.com/sg.svg" },
  { code: "TH", label: "TH", flag: "https://flagcdn.com/th.svg" },
];

export function viewConverter(value: string | number): string {
  const num = Number(value);
  if (isNaN(num)) return "";
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}
