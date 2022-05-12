import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ProjectMakeForm from "../../elements/ProjectList/ProjectMakeForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 12,
  p: 4,
};

export default function ProjectMake() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button className="w-full h-full bg-slate-100" onClick={handleOpen}>
        <span className="font-thin text-8xl">+</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProjectMakeForm open={setOpen}/>
        </Box>
      </Modal>
    </>
  );
}