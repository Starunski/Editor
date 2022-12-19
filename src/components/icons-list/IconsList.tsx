import { __ICONS } from "../../icons";
import "./IconsList.scss";

interface Props {
  selected: string;
  setSelected: (icon: string) => void;
}

export const IconsList = ({ selected, setSelected }: Props) => {
  return (
    <div className={"icons-list__container"}>
      {__ICONS.map((icon) => (
        <div
          className={`${icon === selected ? "active" : "icon__container"}`}
          key={icon}
          onClick={() => setSelected(icon)}
        >
          <i className="material-icons">{icon}</i>
        </div>
      ))}
    </div>
  );
};
