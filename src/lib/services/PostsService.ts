// lib/PostsService.ts
import axios from "axios";
import { Post } from "@/models/post"; // adjust path as needed

const BASE_URL = "https://stage73.q2.cz/q2onboarding/q2/posts";
const API_TOKEN = process.env.API_TOKEN;

export class PostsService {
  static async getPosts(): Promise<Post[]> {
    try {
      const response = await axios.get(`${BASE_URL}/list`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { token: API_TOKEN },
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, "listing posts");
    }
  }

  static async createPost({ title, content, author }: Post): Promise<{ success: true }> {
    const response = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: API_TOKEN,
        title,
        content,
        author,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return { success: true };
  }

  static async getPostById(id: string): Promise<Post> {
    try {
      const response = await axios.get(`${BASE_URL}/view/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { token: API_TOKEN },
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, `viewing post ${id}`);
    }
  }

  private static handleError(error: unknown, context: string): Error {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error while ${context}:`, error.response?.data || error.message);
      return new Error(error.response?.data?.error || error.message);
    } else if (error instanceof Error) {
      console.error(`Error while ${context}:`, error.message);
      return error;
    } else {
      console.error(`Unknown error while ${context}:`, error);
      return new Error("An unknown error occurred.");
    }
  }
}
