import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import DraggableCard from "../../elements/ToolBoard/DraggableCard";
import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { queryClient } from "../..";
import { Cards, usePostCards } from "../../api/CardQuery";
import { ProjectKey } from "../../recoil/RoomID";
import { MyProfile } from "../../recoil/MyProfile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
};

interface IBoardProps {
  toDos: Cards[];
  bucketId: string;
  kbbId: string;
  index: number;
  boardOpen: boolean;
  isFetching: boolean;
}

interface IForm {
  toDo: string;
  toDoComment: string;
}

const Bucket = ({ toDos, bucketId, kbbId, index, boardOpen, isFetching }: IBoardProps) => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { nickname, loginId } = useRecoilValue(MyProfile);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const { mutateAsync } = usePostCards();
  // 여기 URL 확인하기
  // const { data } = useGetProjectUser(pjId);
  // console.log(data);
  const onValid = ({ toDo, toDoComment }: IForm) => {
    // if (name === "") {
    //   alert("담당자 선택해주세요");
    //   return;
    // }
    const newToDo = {
      kbbId,
      title: toDo,
      contents: toDoComment,
      manager: loginId,
    };
    mutateAsync(newToDo).then(() => {
      queryClient.invalidateQueries(["getBoard", pjId]);
    });
    setValue("toDo", "");
    setValue("toDoComment", "");
    setOpen(false);
    setName("");
  };
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setName(e.target.value);
  };
  return (
    <div className="min-w-[280px] sm:max-w-[247px] w-96 lg:mr-7 rounded-md min-h-[870px] flex flex-col sm:ml-[34px]">
      <div className="w-full h-6 mt-10 sm:mt-10 flex justify-between">
        <h2 className="text-center font-semibold text-lg">{bucketId}</h2>
        <button
          className="h-full border-none bg-transparent flex items-center"
          onClick={handleOpen}
        >
          <span className=" text-2xl text-black">+</span>
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="w-[704px] h-[384px] rounded-xl sm:w-[320px] sm:h-[448px] pb-[15px] px-[19px] pt-[25px]"
        >
          <form className="w-full h-full relative space-y-[21px]" onSubmit={handleSubmit(onValid)}>
            <input
              autoFocus
              className="w-full outline-none border-none placeholder:text-black placeholder:font-semibold font-semibold"
              {...register("toDo")}
              type="text"
              placeholder="보드의 제목을 적어주세요 :)"
            />
            <div className="w-full flex items-center space-x-4">
              <div className="w-[60px] h-7 bg-slate-200 text-base font-semibold rounded-md leading-8">
                <span className="text-center">{bucketId}</span>
              </div>
              {/* <select
                className="outline-none bg-slate-200 border-0"
                value={name}
                onChange={onChange}
              >
                <option defaultValue="none">=== 선택 ===</option>
                {user?.data?.map((member, index) => {
                  return (
                    <option key={index} value={member.nickname}>
                      {member.nickname}
                    </option>
                  );
                })}
                <option value={nickname}>{nickname}</option>
              </select> */}
              <select
                className="outline-none bg-slate-200 border-0 rounded-md w-[86px] h-7 text-center"
                value={name}
                onChange={onChange}
              >
                {/* <option defaultValue="none">=== 선택 ===</option> */}
                <option value={loginId}>{nickname}</option>
              </select>
            </div>
            <input
              className="w-full outline-none border-none"
              {...register("toDoComment")}
              type="text"
              placeholder="내용입력"
            />
            <button
              className="w-16 h-9 absolute bottom-0 right-[70px] rounded-md  font-semibold text-base bg-3 text-white"
              type="submit"
            >
              <span>등록</span>
            </button>
            <button
              onClick={handleClose}
              className="w-16 h-9 absolute bottom-0 right-0 rounded-md  font-semibold text-base bg-5"
              type="submit"
            >
              <span>닫기</span>
            </button>
          </form>
        </Box>
      </Modal>
      {!isFetching && (
        <Droppable droppableId={String(index)}>
          {(magic, info) => (
            <div
              className={`${
                info.isDraggingOver
                  ? "bg-gray-200"
                  : info.draggingFromThisWith
                  ? "bg-gray-100"
                  : "bg-[#E7EBF2]"
              } ${
                boardOpen ? "bg-transparent" : "bg-[#E7EBF2]"
              } lg:overflow-y-scroll lg:overflow-x-hidden lg:h-[750px] sm:h-auto md:min-h-[600px] p-2 mt-3 rounded-lg w-full flex flex-col transition-colors ease-in-out delay-100`}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard
                  key={toDo.kbcId}
                  index={index}
                  toDoId={toDo.kbcId}
                  toDoText={toDo.contents}
                  toDoName={toDo.manager}
                  toDoTitle={toDo.title}
                  bucketId={bucketId}
                />
              ))}
              {magic.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default React.memo(Bucket);
