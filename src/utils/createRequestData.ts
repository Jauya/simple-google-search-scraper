export const createRequestData = (query: string) => {
  const reqData = JSON.stringify({
    q: query.trim(),
    location: "Peru",
    gl: "pe",
    hl: "es-419",
  });
  return reqData;
};
