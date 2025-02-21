"use server";

import { serperSearch } from "@/lib/serper";
import { searchData } from "@/types/searchData";

export const searchSerperAction = async (query: string, apikey: string) => {
  try {
    if (!query.trim()) return Error("Invalid query");

    const data: searchData = await serperSearch(query, apikey);
    return data;
  } catch (error) {
    console.error(error);
    return error instanceof Error ? error : new Error("Something went wrong");
  }
};
