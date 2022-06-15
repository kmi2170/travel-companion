export type Coords = { lat: number; lng: number };

export type Bounds = {
  ne: { lat: number; lng: number };
  sw: { lat: number; lng: number };
};

export interface BoundsAPI {
  type: string;
  NE_Lat: number;
  NE_Lng: number;
  SW_Lat: number;
  SW_Lng: number;
}
