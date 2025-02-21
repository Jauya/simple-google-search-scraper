import axios from "axios";

export const serperAxiosClient = axios.create({
  baseURL: "https://google.serper.dev/",
  headers: {
    "Content-Type": "application/json",
  },
});

export enum SearchType {
  SEARCH = "search",
  AUTOCOMPLETE = "autocomplete",
  PLACES = "places",
}
