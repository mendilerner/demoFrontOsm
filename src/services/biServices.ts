import axios from "axios";
import { BASE_URL } from "./usersServices";
import { handleUnAxiosError } from "./usersServices";

export async function fetchBiData<T>(biEndPoint: string): Promise<T[] | void> {
  try {
    const fullUrl = `${BASE_URL}/bi/${biEndPoint}`;
    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    handleUnAxiosError(error);
  }
}