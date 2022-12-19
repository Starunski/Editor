import "./Slide.scss";
import { useState } from "react";
import IconComponent from "../icon-component/IconComponent";

interface List {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
}
interface IDnDState {
  draggedFrom: number | null;
  draggedTo: number | null;
  isDragging: boolean;
  originalOrder: List[];
  updatedOrder: List[];
}

interface Props {
  list: List[];
  setList: (value: List[]) => void;
}
const initialDnDState: IDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

export const Slide = ({ list, setList }: Props) => {
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event: any) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });

    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData("text/html", "");
  };

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const onDragOver = (event: any) => {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom: any = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item: any, index: any) => index !== draggedFrom);

    newList = [...remainingItems.slice(0, draggedTo), itemDragged, ...remainingItems.slice(draggedTo)];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = () => {
    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  const onUpdateField = (data: List, id: number, field: string) => {
    setList((prev: List[]) => {
      return prev.map((item: any) => ({
        ...item,
        [field]: item.id === id ? data : item[field],
      }));
    });
  };

  return (
    <div className={"slide__container"}>
      {list.map((item: any, index: any) => {
        return (
          <div
            key={index}
            data-position={index}
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            className={dragAndDrop && dragAndDrop.draggedTo === Number(index) ? "slide__item" : ""}
          >
            <IconComponent
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              id={item.id}
              onUpdateField={onUpdateField}
            />
          </div>
        );
      })}
    </div>
  );
};
