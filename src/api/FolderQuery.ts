import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../servers/axios";

export interface Folders {
  title?: string;
  isLoading?: boolean;
  dfId?: string;
  position?: number;
  docs?: [];
}

export interface IFolders {
  data: Folders[];
}

export interface IDocs {
  docId?: string;
  title?: string;
  contents?: string;
}

/* 여기 스프레드 api 확인 */
export interface Test {
  pjId: string;
  title: string;
  position: number;
}

export const useGetFolders = (pjId: string) => {
  return useQuery<IFolders, AxiosError>("getFolders", () => {
    return instance.get(`api/folders/?pjId=${pjId}`);
  });
};

export const useAddFolder = () => {
  return useMutation(async (Folder: Test) => {
    await instance.post("api/folders/", Folder).then((res) => {
      console.log(res);
    });
  });
};

export const useDelFolder = (dfId: string) => {
  return useMutation(async () => {
    await instance.delete(`api/folders/${dfId}`);
  });
};

export const useUpdateFolder = (dfId: string) => {
  return useMutation(async (Folder: Folders) => {
    await instance.put(`api/folders/${dfId}`, Folder);
  });
};
