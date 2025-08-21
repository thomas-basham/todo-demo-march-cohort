import { useState, useEffect } from "react";
import {
  scanTodos,
  createTodo,
  deleteTodoById,
  updateTodo,
} from "./utils/dynamo";
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { motion } from "motion/react";
function App() {
  const [todos, setTodos] = useState([]); // the array where scanCommand will save the information
  const [text, setText] = useState(""); // string that is representing the text that you want to save in the table
  const [todoToEdit, setTodoToEdit] = useState({});

  // The useEffect hook is called every time the component is showed to the user
  // onload event on html
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
    // await updateTodo(todoToEdit);

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

        <ul style={{ marginTop: 16 }}>
          {todos.map((todoElem) =>
            todoToEdit?.id === todoElem.id ? (
              <div key={todoElem.id}>
                <input
                  value={todoToEdit.TodoText}
                  onChange={(event) =>
                    setTodoToEdit({
                      id: todoToEdit.id,
                      TodoText: event.target.value,
                      IsComplete: todoToEdit.IsComplete,
                    })
                  }
                  type="text"
                  name="edit-input"
                  id="edit-input"
                />
                <button onClick={() => handleUpdateTodo()}> Submit</button>
              </div>
            ) : (
              <motion.li
                key={todoElem.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {todoElem.TodoText}{" "}
                <HiOutlinePencilSquare
                  onClick={() => setTodoToEdit(todoElem)}
                />
                <IoTrashOutline
                  className="delete-btn"
                  onClick={() => handleDeleteTodo(todoElem.id)}
                />
              </motion.li>
            )
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
