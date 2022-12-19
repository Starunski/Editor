import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconsList } from "../icons-list/IconsList";
import { useState } from "react";

interface Props {
  onUpdateField: (data: string, id: number, fieldName: string) => void;
  id: number;
}

export const StoryDialog = ({ onUpdateField, id }: Props) => {
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = useState("");

  const handleClickClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    onUpdateField(selected, id, "icon");
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onSubmit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Select icon"}</DialogTitle>
        <DialogContent>
          <IconsList selected={selected} setSelected={setSelected} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={onSubmit} autoFocus>
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
