export interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
}

export interface CreatedLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
}

export interface ClicksPerDay {
  date: string;
  clicks: number;
}

export interface TopReferrer {
  referrer: string;
  clicks: number;
}

export interface Analytics {
  totalClicks: number;
  clicksPerDay: ClicksPerDay[];
  topReferrers: TopReferrer[];
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}
