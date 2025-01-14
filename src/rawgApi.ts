import axios, { AxiosResponse } from "axios";

const rawgAPIKey = import.meta.env.VITE_RAWG_API_KEY;

const rawgAPI = axios.create({
  baseURL: "https://api.rawg.io/api",
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

const fetchGames = async (url: string, platforms?: string | null): Promise<Game[]> => {
  const response: AxiosResponse<ApiResponse> = await rawgAPI.get(url, {
    params: { platforms },
  });
  return response.data.results;
};

export const getUpcomingGames = async (platforms?: string | null): Promise<Game[]> => {
  return fetchGames(
    `/games?key=${rawgAPIKey}&dates=2025-01-13,2025-04-13&ordering=-added`,
    platforms
  );
};

export const getAllGames = async (): Promise<Game[]> => {
  return fetchGames(`/games?key=${rawgAPIKey}`);
};

export const fetchGameDetails = async (gameSlug: string): Promise<Game> => {
  try {
    const response: AxiosResponse<Game> = await rawgAPI.get(`/games/${gameSlug}?key=${rawgAPIKey}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw new Error(`Unable to fetch details for game: ${gameSlug}`);
  }
};


