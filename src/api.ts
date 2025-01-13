import axios from "axios";

const rawgAPIKey = import.meta.env.VITE_RAWG_API_KEY;

// figure out API key

const rawgAPI = axios.create({
  baseURL: "https://api.rawg.io/api",
});

type GameData = {
  name: string;
  background_image: string;
  platforms: [{ platform: { id: number; name: string } }];
  stores: [{ store: { id: number; name: string } }];
  released: string;
  playtime: number;
  id: number;
  genres: [{ id: number; name: string; slug: string }];
};

// figure out typescript

export const getUpcomingGames = (): Promise<GameData[]> => {
  return rawgAPI
    .get(`/games?key=${rawgAPIKey}&dates=2025-01-13,2025-04-13&ordering=-added`)
    .then((response) => {
      return response.data.results;
    });
};
