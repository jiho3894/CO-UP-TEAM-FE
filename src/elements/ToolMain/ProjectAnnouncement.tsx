import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { queryClient } from "../..";
import { useGetAnnouncement, usePostAnnouncement } from "../../api/AnnouncementQuery";
import { Plus } from "../../elements/Icon/Plus";
import { ProjectKey } from "../../recoil/RoomID";
import styled from "styled-components";
import EmptyAnnouncement from "../../images/Main/EmptyAnnouncement.png";
import DetailAnnouncement from "./DetailAnnouncement";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
};

interface IForm {
  title: string;
  content: string;
}

const ProjectAnnouncement = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { pjId, projectRole } = useRecoilValue(ProjectKey);
  const { data: Ann } = useGetAnnouncement(pjId);
  const { mutateAsync: postAn } = usePostAnnouncement();
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "." + month + "." + day;

  const onSubmit: SubmitHandler<IForm> = (data) => {
    if (data.title.trim() === "") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "공지 제목을 적어주세요😊",
      });
      return;
    }
    if (!data.content) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "공지 내용을 적어주세요😊",
      });
      return;
    }
    const post = {
      pjId,
      title: data.title,
      contents: data.content,
    };
    postAn(post).then(() => queryClient.invalidateQueries("getAnnouncement"));
    setValue("title", "");
    setValue("content", "");
    setOpen(false);
  };

  return (
    <div className="w-full h-full bg-[#ffffff] dark:bg-7 border border-solid rounded-2xl pl-[20px] pr-[10px] sm:px-[20px] flex flex-col">
      <div className="w-full flex justify-center">
        <div className="w-full flex items-center justify-between mb-[21px] px-[10px] sm:px-0 mt-[28px]">
          <span className="font-bold text-xl">공지사항</span>
          <div onClick={handleOpen} className="cursor-pointer">
            {projectRole === "ADMIN" ? <Plus /> : ""}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[704px] h-[384px] rounded-xl sm:w-[90%]">
          <form className="w-full h-full relative" onSubmit={handleSubmit(onSubmit)}>
            <input
              autoFocus
              className="w-full mb-[10px] outline-none text-2xl border-none placeholder:text-[#B0B0B0] placeholder:font-semibold font-semibold"
              {...register("title")}
              type="text"
              placeholder="공지 제목을 적어주세요 :)"
              maxLength={30}
            />
            <span className="text-[#666] pl-[2px]">{dateString}</span>
            <ScrollTextArea
              className="w-full h-[160px] outline-none border-none resize-none overflow-y-auto mt-[22px] text-lg placeholder:text-[#B0B0B0]"
              {...register("content")}
              maxLength={254}
              placeholder="내용을 입력해주세요"
            />
            <div className="absolute bottom-0 right-0">
              <button className="text-white bg-3 w-[58px] h-[37px] rounded-md" type="submit">
                <span className="leading-[21px]">등록</span>
              </button>
              <button
                onClick={handleClose}
                className="bg-5 w-[58px] h-[37px] rounded-md ml-[4px]"
                type="button"
              >
                <span className="leading-[21px]">닫기</span>
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      {Ann?.data.length === 0 ? (
        <div className="flex flex-col items-center -mt-[15px]">
          <img width={271} height={166} src={EmptyAnnouncement} alt="" />
          <span className="text-lg text-[#B0B0B0] mt-[20px]">팀원들에게 메세지를 전달해보세요</span>
        </div>
      ) : (
        <Scroll className="w-full flex flex-col-reverse mb-[20px] px-[10px] sm:p-0 overflow-y-auto">
          {Ann?.data.map((ann, index) => {
            return (
              <DetailAnnouncement
                key={ann.noticeId}
                index={index}
                title={ann.title}
                contents={ann.contents}
                modifiedTime={ann.modifiedTime}
                noticeId={ann.noticeId}
              />
            );
          })}
        </Scroll>
      )}
    </div>
  );
};

const ScrollTextArea = styled.textarea`
  &::-webkit-scrollbar-thumb {
    background: #ebebeb;
  }
`;

const Scroll = styled.div`
  &::-webkit-scrollbar-thumb {
    background: #ebebeb;
  }
`;

export default ProjectAnnouncement;
