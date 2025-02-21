import { createRequestData } from "@/utils/createRequestData";
import { SearchType, serperAxiosClient } from "./serperAxiosClient";
import { createRequestOptions } from "@/utils/createRequestOptions";

export const serperSearch = async (queries: string, apikey: string) => {
  try {
    const reqData = createRequestData(queries);
    const reqOptions = createRequestOptions(apikey);

    const response = await serperAxiosClient.post(
      SearchType.SEARCH,
      reqData,
      reqOptions
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
