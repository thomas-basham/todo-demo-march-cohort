import React from "react";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function TodoEditor({
  todoElem,
  todoToEdit,
  setTodoToEdit,
  handleUpdateTodo,
}) {
  return (
    <Stack key={todoElem.id} spacing={2} direction="row">
      <TextField
        value={todoToEdit.TodoText}
        onChange={(event) =>
          setTodoToEdit({
            id: todoToEdit.id,
            TodoText: event.target.value,
            IsComplete: todoToEdit.IsComplete,
          })
        }
        id="outlined-basic"
        label="Update todo"
        variant="outlined"
      />

      <Button variant="contained" onClick={() => handleUpdateTodo()}>
        Submit Updates
      </Button>
    </Stack>
  );
}
