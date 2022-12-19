import React, { useState } from "react";
import "./IconComponent.scss";
import { StoryDialog } from "../dialog/StoryDialog";
import { TextField } from "@mui/material";

interface Props {
  title?: string;
  subtitle?: string;
  icon: string;
  onUpdateField: (data: string, id: number, fieldName: string) => void;
  id: number;
}

const IconComponent = ({
  title = "title",
  subtitle = "subtitle",
  icon = "add_circle_outline",
  onUpdateField,
  id,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editSubtitle, setEditSubtitle] = useState(false);

  return (
    <div className={"icon-component__container"}>
      <div className={"icon-component_image__container"}>
        {showModal && <StoryDialog onUpdateField={onUpdateField} id={id} />}

        {icon && (
          <div className="img__container">
            <i onClick={() => setShowModal(!showModal)} className="material-icons">
              {icon}
            </i>
          </div>
        )}
      </div>
      {editTitle ? (
        <TextField
          autoFocus
          onBlurCapture={() => setEditTitle(false)}
          id="standard-basic"
          variant="standard"
          defaultValue={title}
          onChange={(e) => onUpdateField(e.target.value, id, "title")}
        />
      ) : (
        <div className="title" onClick={() => setEditTitle(true)}>
          {title}
        </div>
      )}
      {editSubtitle ? (
        <TextField
          autoFocus
          onBlurCapture={() => setEditSubtitle(false)}
          id="standard-basic"
          variant="standard"
          onChange={(e) => onUpdateField(e.target.value, id, "subtitle")}
          defaultValue={subtitle}
        />
      ) : (
        <div className="subtitle" onClick={() => setEditSubtitle(true)}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default IconComponent;
