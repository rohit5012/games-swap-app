import axios, { AxiosResponse } from "axios";

const opencageAPIKEY = import.meta.env.OPENCAGE_API_KEY;

const openCageAPI = axios.create({
  baseURL: "https://api.opencagedata.com/geocode/v1/",
});

export type MapComponentProps = {
  postcode: string;
};
const fetchMap = async (url: string): Promise<MapComponentProps> => {
  const response: AxiosResponse<ApiResponse> = await openCageAPI.get(url);
  return response.data.results;
};

export const getMapLocations = async (postcode: string) => {
  return fetchMap(`/json?q=${postcode}&key=${opencageAPIKEY}`);
};
