export interface Gamer {
  id: number;
  firstName?: string;
  lastName?: string;
  location: Location;
  latitude: number;
  longitude: number;
  area: string;
  distance?: number;
  userRating: string;
  nickname: string;
  address: string;
  email: string;
  avatarUrL?: string;
  platforms: string;
}

export interface Location {
  lat: number;
  lng: number;
}
