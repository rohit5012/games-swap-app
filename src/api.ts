import axios, { AxiosResponse } from "axios";

const rawgAPIKey = import.meta.env.VITE_RAWG_API_KEY;
const opencageAPIKEY = import.meta.env.OPENCAGE_API_KEY;

const rawgAPI = axios.create({
  baseURL: "https://api.rawg.io/api",
});

const openCageAPI = axios.create({
  baseURL: "https://api.opencagedata.com/geocode/v1/",
});

export type Game = {
  name: string;
  background_image: string;
  platforms: [{ platform: { id: number; name: string } }];
  stores: [{ store: { id: number; name: string } }];
  released: string;
  playtime: number;
  id: number;
  genres: [{ id: number; name: string; slug: string }];
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
};

const fetchGames = async (url: string): Promise<Game[]> => {
  const response: AxiosResponse<ApiResponse> = await rawgAPI.get(url);
  return response.data.results;
};

export const getUpcomingGames = async (): Promise<Game[]> => {
  return fetchGames(
    `/games?key=${rawgAPIKey}&dates=2025-01-13,2025-04-13&ordering=-added`
  );
};

export const getAllGames = async (): Promise<Game[]> => {
  return fetchGames(`/games?key=${rawgAPIKey}`);
};

export const fetchGameDetails = async (gameSlug: string) => {
  try {
    const response = await axios.get(`${BASE_URL}games/${gameSlug}`, {
      params: {
        key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw error;
  }
};
