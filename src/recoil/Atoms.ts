import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "../api/UserQuery";
import IMG from "../images/DuckProfile.jpg";

const { persistAtom } = recoilPersist();

export const themeState = atom({
  key: "themeMode",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

/* 현재 로그인 유저 세션 저장
export const getSession = atom({
  key: "session",
  default: sessionStorage.getItem("token"),
}); */

export const MyProfile = atom<User>({
  key: "myProfile",
  default: {
    loginId: "email",
    social: "KAKAO",
    profileImage: IMG,
    url: "www~~~",
    nickname: "JIHO",
    aboutMe: "안녕하세여",
  },
  effects_UNSTABLE: [persistAtom],
});

export const HandleOpen = atom({
  key: "handleOpen",
  default: false,
});

export interface ProjectRoom {
  pjId: string;
  thumbnail: string;
  title: string;
  summary: string;
  inviteCode: string;
}

export const ProjectKey = atom<ProjectRoom>({
  key: "projectKey",
  default: {
    pjId: "",
    inviteCode: "",
    thumbnail: "",
    title: "",
    summary: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const ChartLength = atom<number[]>({
  key: "chartLength",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
