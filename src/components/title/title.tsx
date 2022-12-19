import { TextField } from "@mui/material";
import "./Title.css";

interface Props {
  titleState: { value: string; show: boolean };
  setTitleState: (prevState: any) => void;
}

export const Title = ({ titleState, setTitleState }: Props) => {
  return (
    <div className="title__container">
      {!titleState.show ? (
        <span
          className="main-title"
          onClick={() => {
            setTitleState((prevState: any) => ({ ...prevState, show: true }));
          }}
        >
          {titleState.value ? titleState.value : "Insert your title here"}
        </span>
      ) : (
        <TextField
          id="standard-basic"
          variant="standard"
          placeholder={"Insert your title here"}
          onChange={(e) => {
            setTitleState((prevState: any) => ({ ...prevState, value: e.target.value }));
          }}
          value={titleState.value}
          autoFocus
          onBlur={() => {
            setTitleState((prevState: any) => ({ ...prevState, show: false }));
          }}
        />
      )}
    </div>
  );
};
