import React, { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
export default function TodoListItem({
  todoElem,
  setTodoToEdit,
  handleDeleteTodo,
}) {
  const [checked, setChecked] = React.useState([0]);
  return (
    <>
      <ListItem
        // key={value}

        disablePadding
      >
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              // checked={checked.includes(value)}
              tabIndex={-1}
              disableRipple
              // inputProps={{ "aria-labelledby": labelId }}
            />
            {todoElem.TodoText}{" "}
            <HiOutlinePencilSquare onClick={() => setTodoToEdit(todoElem)} />
            <IoTrashOutline
              className="delete-btn"
              onClick={() => handleDeleteTodo(todoElem.id)}
            />
          </ListItemIcon>
          <ListItemText />
        </ListItemButton>
      </ListItem>
    </>
  );
}
