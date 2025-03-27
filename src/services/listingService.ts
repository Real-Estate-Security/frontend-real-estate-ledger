// import axios from "../utils/axiosInstance";
// import { components } from "../api/types/api-types";

// const API_BASE_URL = "http://localhost:8080";

// export type ListingResponse = components["schemas"]["server.createListingRequest"];

// // Create Listing function
// export const listing = async (
//     userfirstName: string,
//     userlastName: string,
//     userEmail: string,
//     agentfirstName: string,
//     agentlastName: string,
//     agentEmail: string,
//     address: string,
//     description: string,
//     bathrooms: number,
//     bedrooms: number
//   ): Promise<UserResponse> => {
//     const response = await axios.post<UserResponse>(
//       `${API_BASE_URL}/user/createListing`,
//       {
//         userfirstName: string;
//         userlastName: string;
//         userEmail: string;
//         agentfirstName: string;
//         agentlastName: string;
//         agentEmail: string;
//         address: string;
//         description: string;
//         bathrooms: number;
//         bedrooms: number;
//       }
//     );
//     return response.data;
//   };