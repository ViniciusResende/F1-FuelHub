import axios, { AxiosInstance } from "axios";
import { env } from "../config";

class OpenF1Service {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: env.OPENF1_BASE_URL ?? "https://api.openf1.org/v1",
      timeout: 10_000,
    });
  }

  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const { data } = await this.api.get<T>(path, { params });
    return data;
  }
}

export const openf1 = new OpenF1Service();
