import axios, { AxiosResponse } from "axios";

const opencageAPIKEY = import.meta.env.VITE_OPENCAGE_API_KEY;

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

const fetchGeocode = async (location: string) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${opencageAPIKEY}`
    );
    if (response.data.status.code === 402) {
      console.error("API key quota exceeded");
    } else if (response.data.results.length === 0) {
      console.error("No results found for location");
    } else {
      return response.data.results[0].geometry;
    }
  } catch (error) {
    console.error("Error fetching geocode data:", error);
  }
};

export { fetchGeocode };