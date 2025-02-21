export const createRequestOptions = (apikey: string) => {
  return {
    headers: {
      "X-API-KEY": apikey,
    },
  };
};
