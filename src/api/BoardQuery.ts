import { useMutation, useQuery } from "react-query";
import { instance } from "../servers/axios";

interface Board {
  pjId: string;
  title: string;
  position: number;
}

export const useGetBoard = (pjId: string) => {
  return useQuery("getBoard", () => {
    return instance.get(`api/buckets/?pjId=${pjId}`);
  });
};

export const usePostCard = () => {
  return useMutation(async (post: Board) => {
    await instance.post("api/buckets/", post).then((res) => {
      console.log(res);
    });
  });
};
