export type Coords = { lat: number; lng: number };

export type Bounds = {
  ne: { lat: number; lng: number };
  sw: { lat: number; lng: number };
};

export interface BoundsAPI {
  type: string;
  NE_Lat: string;
  NE_Lng: string;
  SW_Lat: string;
  SW_Lng: string;
}
