import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { updateTodo } from "../utils/dynamo";
export default function TodoListItem({
  todoElem,
  setTodoToEdit,
  handleDeleteTodo,
}) {
  const [isChecked, setIsChecked] = useState(todoElem.IsComplete);

  async function markComplete() {
    setIsChecked(!isChecked);

    const todoToEdit = {
      id: todoElem.id,
      TodoText: todoElem.TodoText,
      IsComplete: !todoElem.IsComplete,
    };

    console.log(todoToEdit);
    await updateTodo(todoToEdit);
  }
  return (
    <>
      <ListItem disablePadding className="todo-div">
        <ListItemButton dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={isChecked}
              onChange={(event) => markComplete(event)}
              tabIndex={-1}
            />
          </ListItemIcon>
          <ListItemText>
            <span>{todoElem.TodoText} </span>
          </ListItemText>
          <ListItemIcon>
            <HiOutlinePencilSquare onClick={() => setTodoToEdit(todoElem)} />
            <IoTrashOutline
              className="delete-btn"
              onClick={() => handleDeleteTodo(todoElem.id)}
            />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </>
  );
}
