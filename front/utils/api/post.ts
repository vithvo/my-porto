import { AxiosInstance } from "axios";
import { PostProps } from "./types";

type CreatePostDto = {
  title: string;
  text: string;
};
type SearchPostDto = {
  title?: string;
  body?: string;
  views?: "DESC" | "ASC";
  limit?: number;
  take?: number;
  tag?: string;
};

export const PostApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<PostProps[]>("/posts");
    return data;
  },
  async search(query: SearchPostDto) {
    const { data } = await instance.get<{ items: PostProps[]; total: number }>("/posts/search", {
      params: query,
    });
    return data;
  },

  async getOne(id: number) {
    const { data } = await instance.get<PostProps>(`/posts/${id}`);
    return data;
  },

  async create(dto: CreatePostDto) {
    const { data } = await instance.post<CreatePostDto, { data: PostProps }>("/posts", dto);
    return data;
  },
  async update(id: number, dto: CreatePostDto) {
    const { data } = await instance.patch<CreatePostDto, { data: PostProps }>(`/posts/${id}`, dto);
    return data;
  },
  async remove(id: number) {
    return instance.delete("/posts/" + id);
  },
});
