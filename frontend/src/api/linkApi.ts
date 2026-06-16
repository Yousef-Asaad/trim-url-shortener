import axios from "axios";
import { ApiSuccess, Link, CreatedLink, Analytics } from "../types/link";

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: API_BASE_URL,
});

export const createLink = async (
  originalUrl: string
): Promise<CreatedLink> => {
  const res = await client.post<ApiSuccess<CreatedLink>>("/api/links", {
    originalUrl,
  });
  return res.data.data;
};

export const getLinks = async (): Promise<Link[]> => {
  const res = await client.get<ApiSuccess<Link[]>>("/api/links");
  return res.data.data;
};

export const getAnalytics = async (id: string): Promise<Analytics> => {
  const res = await client.get<ApiSuccess<Analytics>>(
    `/api/links/${id}/analytics`
  );
  return res.data.data;
};
