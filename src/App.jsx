import { useState, useEffect } from "react";
import {
  scanTodos,
  createTodo,
  deleteTodoById,
  updateTodo,
} from "./utils/dynamo";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import TodoListItem from "./components/TodoListItem";
import TodoEditor from "./components/TodoEditor";
function App() {
  const [todos, setTodos] = useState([]); // the array where scanCommand will save the information
  const [text, setText] = useState(""); // string that is representing the text that you want to save in the table
  const [todoToEdit, setTodoToEdit] = useState({});

  // The useEffect hook is called every time the component is showed to the user
  useEffect(() => {
    async function getTodos() {
      const scanned = await scanTodos();
      setTodos(scanned);
    }

    getTodos();
  }, []);

  const changeHandlerText = (event) => {
    const data = event.target.value;
    setText(data);
  };

  const handleCreateTodo = async () => {
    const createdTodo = await createTodo(text);

    setTodos([...todos, createdTodo]);
    setText("");
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodoById(id);

    const filteredTodos = todos.filter((todo) => {
      return todo.id != id;
    });

    setTodos(filteredTodos);
  };

  const handleUpdateTodo = async () => {
    await updateTodo(todoToEdit);

    setTodos((previousTodos) => {
      return previousTodos.map((todo) => {
        return todo.id === todoToEdit.id ? todoToEdit : todo;
      });
    });
    setTodoToEdit({});
  };

  return (
    <>
      <div className="todo-div">
        <h1>Todo App</h1>

        <Stack spacing={2} direction="row">
          <TextField
            value={text}
            // defaultValue={text}
            onChange={changeHandlerText}
            id="outlined-basic"
            label="What todo?"
            variant="outlined"
          />

          <Button variant="contained" onClick={() => handleCreateTodo()}>
            Create Todo
          </Button>
        </Stack>

        <List dense sx={{ width: "100%" }}>
          {todos.map((todoElem) =>
            todoToEdit?.id === todoElem.id ? (
              <TodoEditor
                key={todoToEdit.id + "edit"}
                todoElem={todoElem}
                todoToEdit={todoToEdit}
                setTodoToEdit={setTodoToEdit}
                handleUpdateTodo={handleUpdateTodo}
              />
            ) : (
              <TodoListItem
                key={todoElem.id}
                todoElem={todoElem}
                setTodoToEdit={setTodoToEdit}
                handleDeleteTodo={handleDeleteTodo}
              />
            )
          )}
        </List>
      </div>
    </>
  );
}

export default App;
