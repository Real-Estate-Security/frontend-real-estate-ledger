import { create } from "zustand";
import {
  getPropertyByID as getPropertyByIDApi,
} from "../services/propertyService";


export interface PropertyFromAPI {
  Id: number;
  OwnerId: number;
  Address: string;
  City: string;
  State: string;
  ZipCode: number;
  NumOfBedrooms: number;
  NumOfBathrooms: number;
}

interface PropertyState {
  propertyFromAPI: PropertyFromAPI | null;
  getPropertyByIDAPI: (propertyID: number, username: string) => Promise<void>;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  propertyFromAPI: null, // Initialize assetFromAPI as null
  getPropertyByIDAPI: async (propertyID, username) => {
    console.log("propertyStore:getPropertyByIDAPI: propertyID=" + propertyID + ", username=" + username)    
    try {
      const response = await getPropertyByIDApi(propertyID, username);

      if (response) {
        // Map the API response to the AssetFromAPI format
        const propertyFromAPI: PropertyFromAPI = {
          Id: response.ID,
          OwnerId: response.Owner,
          Address: response.Address,
          City: response.City,
          State: response.State,
          ZipCode: response.ZipCode,
          NumOfBedrooms: response.NumOfBedrooms,
          NumOfBathrooms: response.NumOfBathrooms
        };
        set({ propertyFromAPI }); // Update the state with the mapped asset
        console.log("propertyStore:getPropertyByIDAPI: propertyFromAPI=" + JSON.stringify(propertyFromAPI));
      }
    } catch (error) {
      console.error("Error fetching asset by ID:", error);
    }
  },
}));